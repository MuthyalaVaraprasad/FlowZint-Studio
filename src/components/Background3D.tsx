import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  // Orbit Mode properties
  angle?: number;
  speed?: number;
  orbitRadius?: number;
  orbitTilt?: number;
  orbitRatio?: number;
  isStar?: boolean;
  // Matrix Stream properties
  length?: number;
  color?: string;
}

interface Background3DProps {
  screen: 'preloader' | 'signin' | 'dashboard';
}

export const Background3D: React.FC<Background3DProps> = ({ screen }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Configurations
    const maxParticles = screen === 'preloader' ? 60 : screen === 'signin' ? 40 : 80;
    const connectionDist = 120;
    const mouseRadius = 150;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;

      if (screen === 'preloader') {
        // Mode 1: Cosmic Nebula Orbits & Star Field
        // 1. Generate twinkling stars for depth
        const numStars = 80;
        for (let i = 0; i < numStars; i++) {
          const radius = Math.random() * 1.2 + 0.3;
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.06,
            vy: (Math.random() - 0.5) * 0.06,
            radius,
            baseRadius: radius,
            alpha: Math.random() * 0.7 + 0.2,
            isStar: true,
            speed: Math.random() * 0.01 + 0.003, // twinkle frequency multiplier
          });
        }

        // 2. Generate orbital nodes moving on tilted paths
        const numOrbits = 35;
        for (let i = 0; i < numOrbits; i++) {
          const orbitRadius = Math.random() * Math.min(w, h) * 0.38 + 50;
          particles.push({
            x: w / 2,
            y: h / 2,
            vx: 0,
            vy: 0,
            radius: Math.random() * 2.2 + 1,
            baseRadius: Math.random() * 2.2 + 1,
            alpha: Math.random() * 0.6 + 0.4,
            angle: Math.random() * Math.PI * 2,
            speed: (Math.random() * 0.002 + 0.0006) * (Math.random() > 0.5 ? 1 : -1),
            orbitRadius,
            orbitTilt: (Math.random() - 0.5) * Math.PI * 0.3, // Tilt angle of orbit
            orbitRatio: 0.3 + Math.random() * 0.2, // Y-to-X ratio for 3D perspective
            isStar: false
          });
        }
      } else if (screen === 'signin') {
        // Mode 2: Cyber Grid Stream (Vertical Matrix Lines)
        const columns = Math.floor(w / 35);
        for (let i = 0; i < columns; i++) {
          particles.push({
            x: i * 35 + Math.random() * 10,
            y: Math.random() * h,
            vx: 0,
            vy: Math.random() * 2.5 + 1.5,
            radius: Math.random() * 1 + 0.5,
            baseRadius: 1,
            alpha: Math.random() * 0.4 + 0.2,
            length: Math.random() * 120 + 40,
            color: Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ',
          });
        }
      } else {
        // Mode 3: Interactive Plexus
        for (let i = 0; i < maxParticles; i++) {
          const radius = Math.random() * 2 + 1;
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius,
            baseRadius: radius,
            alpha: Math.random() * 0.5 + 0.3,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (screen !== 'dashboard') return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.8;
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1,
          baseRadius: Math.random() * 1.2 + 0.8,
          alpha: 1,
        });
        
        if (particles.length > 120) {
          particles.shift();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    if (screen === 'dashboard') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('click', handleClick);
    }

    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      if (screen === 'preloader') {
        // Draw Preloader: Slow 3D concentric orbits & star nebula
        const cx = w / 2;
        const cy = h / 2;

        // 1. Draw twinkling background stars
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.isStar) {
            // Update drifting star position
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            // twinkle alpha calculation
            const currentAlpha = Math.abs(Math.sin(Date.now() * (p.speed || 0.002) + p.x)) * (p.alpha || 0.5);

            ctx.fillStyle = isDark
              ? `rgba(255, 255, 255, ${currentAlpha * 0.85})`
              : `rgba(100, 116, 139, ${currentAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 2. Draw faint 3D elliptical background orbit lines
        ctx.lineWidth = 0.5;
        const maxOrbits = 6;
        for (let o = 1; o <= maxOrbits; o++) {
          const r = Math.min(w, h) * 0.07 * o + 30;
          // Apply a rotating orbital tilt perspective in 3D
          const tilt = (o - 3.5) * 0.15;
          const ratio = 0.32 + o * 0.03;
          ctx.strokeStyle = isDark ? `rgba(139, 92, 246, 0.05)` : `rgba(124, 58, 237, 0.04)`;
          ctx.beginPath();
          if (ctx.ellipse) {
            ctx.ellipse(cx, cy, r, r * ratio, tilt, 0, Math.PI * 2);
          } else {
            // fallback if browser doesn't support ellipse
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
          }
          ctx.stroke();
        }

        // 3. Draw connection lines between nearby orbital nodes (orbital plexus network)
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          if (p1.isStar || p1.isStar === undefined) continue;
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.isStar || p2.isStar === undefined) continue;
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              const linkAlpha = (1 - dist / 90) * 0.12 * Math.min(p1.alpha, p2.alpha);
              ctx.strokeStyle = isDark ? `rgba(139, 92, 246, ${linkAlpha})` : `rgba(124, 58, 237, ${linkAlpha})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // 4. Draw and update orbit particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p.isStar && p.angle !== undefined && p.speed !== undefined && p.orbitRadius !== undefined) {
            p.angle += p.speed;
            
            // 3D Elliptical orbit projection
            const tilt = p.orbitTilt || 0;
            const ratio = p.orbitRatio || 0.4;
            const rX = p.orbitRadius;
            const rY = rX * ratio;
            const cosT = Math.cos(tilt);
            const sinT = Math.sin(tilt);
            const cosA = Math.cos(p.angle);
            const sinA = Math.sin(p.angle);

            p.x = cx + rX * cosA * cosT - rY * sinA * sinT;
            p.y = cy + rX * cosA * sinT + rY * sinA * cosT;

            // Draw glowing node
            ctx.fillStyle = isDark
              ? `rgba(168, 85, 247, ${p.alpha})`
              : `rgba(124, 58, 237, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Intermittent glow ray lines connecting to core center
            if (p.alpha > 0.5) {
              ctx.strokeStyle = isDark
                ? `rgba(6, 182, 212, ${p.alpha * 0.12})`
                : `rgba(8, 145, 178, ${p.alpha * 0.08})`;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            }
          }
        }
      } else if (screen === 'signin') {
        // Draw SignIn: Vertical Matrix stream lines
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y += p.vy;

          if (p.y - (p.length || 0) > h) {
            p.y = 0;
            p.x = Math.random() * w;
          }

          // Draw the stream tail gradient
          const grad = ctx.createLinearGradient(p.x, p.y - (p.length || 50), p.x, p.y);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, `${p.color || 'rgba(139, 92, 246, '}${p.alpha})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - (p.length || 50));
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Draw glowing node at stream head
          ctx.fillStyle = isDark ? '#fff' : 'hsl(var(--primary))';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Draw Dashboard: Interactive Plexus
        const mouse = mouseRef.current;
        mouse.rx += (mouse.x - mouse.rx) * 0.08;
        mouse.ry += (mouse.y - mouse.ry) * 0.08;

        if (mouse.active) {
          const gradient = ctx.createRadialGradient(
            mouse.rx, mouse.ry, 10,
            mouse.rx, mouse.ry, mouseRadius
          );
          gradient.addColorStop(0, isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(124, 58, 237, 0.04)');
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, w, h);
        }

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
              const alpha = (1 - dist / connectionDist) * 0.15 * Math.min(p1.alpha, p2.alpha);
              ctx.strokeStyle = isDark 
                ? `rgba(139, 92, 246, ${alpha})`
                : `rgba(124, 58, 237, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          if (mouse.active) {
            const dx = p1.x - mouse.rx;
            const dy = p1.y - mouse.ry;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const alpha = (1 - dist / mouseRadius) * 0.22;
              ctx.strokeStyle = isDark
                ? `rgba(6, 182, 212, ${alpha})`
                : `rgba(8, 145, 178, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.rx, mouse.ry);
              ctx.stroke();
            }
          }
        }

        // Draw dots
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          if (mouse.active) {
            const dx = mouse.rx - p.x;
            const dy = mouse.ry - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const force = (mouseRadius - dist) / mouseRadius;
              p.x -= dx * force * 0.015;
              p.y -= dy * force * 0.015;
              p.radius = p.baseRadius * (1 + force * 0.4);
            } else {
              p.radius = p.baseRadius;
            }
          } else {
            p.radius = p.baseRadius;
          }

          if (particles.length > maxParticles && i >= maxParticles) {
            p.alpha -= 0.005;
            if (p.alpha <= 0) {
              particles.splice(i, 1);
              i--;
              continue;
            }
          }

          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${p.alpha})`
            : `rgba(20, 20, 30, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (screen === 'dashboard') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [screen]);

  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-glow aurora-glow-1"></div>
        <div className="aurora-glow aurora-glow-2"></div>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
