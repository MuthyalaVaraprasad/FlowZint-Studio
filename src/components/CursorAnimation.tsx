import React, { useEffect, useRef } from 'react';

export const CursorAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
    }

    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isHoveringInteractive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      const target = e.target as HTMLElement;
      isHoveringInteractive = !!(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      );

      if (Math.random() < 0.4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1,
          color: '168, 85, 247', // Purple
          alpha: 0.8,
          decay: 0.02 + Math.random() * 0.02
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 1.5,
          color: '6, 182, 212', // Cyan
          alpha: 1.0,
          decay: 0.03 + Math.random() * 0.03
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    let animId: number;
    const update = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.98;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.5})`;
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, isHoveringInteractive ? 16 : 8, 0, Math.PI * 2);
      ctx.strokeStyle = isHoveringInteractive ? 'rgba(6, 182, 212, 0.8)' : 'rgba(168, 85, 247, 0.5)';
      ctx.lineWidth = isHoveringInteractive ? 2 : 1.5;
      ctx.shadowBlur = isHoveringInteractive ? 12 : 4;
      ctx.shadowColor = isHoveringInteractive ? 'rgba(6, 182, 212, 0.5)' : 'rgba(168, 85, 247, 0.3)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.targetX, mouse.targetY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999
      }}
    />
  );
};
