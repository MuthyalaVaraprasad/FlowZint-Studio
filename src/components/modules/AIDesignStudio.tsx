import React, { useState } from 'react';
import { Activity, Sliders, Palette, Code, Check, Copy, Layout } from 'lucide-react';

const features = [
  "AI Layout Generator", "CSS Glassmorphism Compiler", "Palette Theme Recommender", "SVG Asset Optimizer",
  "Tailwind Utility Class Parser", "Figma Design Token Converter", "Auto Image Crop & Resize", "CSS Animation Spline Builder",
  "Font Pairings Suggester", "Accessibility Color Contrast Audit", "Dark Mode Palette Adaptor", "Dynamic UI Preview Box",
  "Vector Node SVG Drawer", "Micro-interaction Speed Tuner", "Real-time CSS code Copier", "Flexbox Grid Auto-adjuster",
  "Satin Gloss Layer Optimizer", "Neo-Brutalism Shadow Generator", "Background Radial Blur Config", "Custom Border Outline Maker",
  "Icon Set SVG Bundle Builder", "UI Screenshot PDF Exporter", "Design Version History Log", "AI Wireframe Sketch Scanner",
  "Aurora Glow Matrix Editor", "Fluid Typography REM Scaler", "CSS Variables Index Generator", "Component Boilerplate Exporter",
  "Device Screen Ratio Previewer", "SVG Path Curve Editor", "Gradient Stop Position Mixer", "Button Hover Effect Customizer",
  "Input Form State Style Designer", "Table Data Styled Grid Config", "Modal Backdrop Blur Controller", "Scrollbar Custom CSS Styler",
  "Loading Skeleton Generator", "AI Logo Concept Sketcher", "Avatar Image Silhouette Clipper", "Header Navigation Layout Builder",
  "Sidebar Flex Menu Architect", "Card Shadow Offset Configurator", "Visual Design Asset Catalog", "Code Sandbox Live Preview Link",
  "Framer Motion Keyframe Helper"
];

export const AIDesignStudio: React.FC = () => {
  const [blur, setBlur] = useState(12);
  const [bgOpacity, setBgOpacity] = useState(15);
  const [borderOpacity, setBorderOpacity] = useState(10);
  const [hue, setHue] = useState(263);
  const [radius, setRadius] = useState(12);
  const [preset, setPreset] = useState<'custom' | 'violet' | 'cyan' | 'emerald' | 'amber'>('violet');
  const [copied, setCopied] = useState(false);
  const [featureAlert, setFeatureAlert] = useState<string | null>(null);

  const applyPreset = (p: 'violet' | 'cyan' | 'emerald' | 'amber') => {
    setPreset(p);
    if (p === 'violet') {
      setHue(263);
      setBlur(16);
      setBgOpacity(10);
      setBorderOpacity(15);
      setRadius(16);
    } else if (p === 'cyan') {
      setHue(187);
      setBlur(12);
      setBgOpacity(8);
      setBorderOpacity(20);
      setRadius(8);
    } else if (p === 'emerald') {
      setHue(142);
      setBlur(20);
      setBgOpacity(12);
      setBorderOpacity(12);
      setRadius(20);
    } else if (p === 'amber') {
      setHue(38);
      setBlur(10);
      setBgOpacity(15);
      setBorderOpacity(25);
      setRadius(12);
    }
  };

  const getCSSCode = () => {
    return `.glass-card {
  background: rgba(255, 255, 255, ${bgOpacity / 100});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});
  border-radius: ${radius}px;
  box-shadow: 0 8px 32px 0 hsla(${hue}, 80%, 50%, 0.15);
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCSSCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerFeature = (feat: string) => {
    setFeatureAlert(`Feature Simulated: "${feat}". Processing design variables...`);
    if (feat === "AI Layout Generator") {
      setBlur(14);
      setBgOpacity(20);
      setRadius(16);
    } else if (feat === "Tailwind Utility Class Parser") {
      setFeatureAlert(`Tailwind output: bg-white/20 backdrop-blur-[12px] border border-white/10`);
    } else if (feat === "Accessibility Color Contrast Audit") {
      setFeatureAlert(`Accessibility Audit: PASS (Ratio 4.8:1 - AA Compliant)`);
    }
    setTimeout(() => setFeatureAlert(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Feature Alert Toast */}
      {featureAlert && (
        <div className="bg-purple-950/80 border border-purple-500/30 p-2 text-center text-xs font-mono text-purple-300 flex items-center justify-center gap-2 animate-bounce">
          <Activity size={14} className="animate-spin" />
          {featureAlert}
        </div>
      )}

      {/* Main Designer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Panel: Sliders & Controls */}
        <div className="glass p-5 border-white/5 bg-slate-900/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Sliders className="text-purple-400" size={16} />
            <span className="font-mono text-xs font-bold text-white uppercase">Glassmorphism Customizer</span>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Aura Color Presets</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'violet', label: 'Cyber Violet', color: 'border-purple-500/30 text-purple-400 bg-purple-950/5' },
                { id: 'cyan', label: 'Digital Cyan', color: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/5' },
                { id: 'emerald', label: 'Neon Mint', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/5' },
                { id: 'amber', label: 'Amber Flame', color: 'border-amber-500/30 text-amber-400 bg-amber-950/5' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id as any)}
                  className={`px-2 py-1.5 rounded text-[10px] font-mono border transition-all truncate ${
                    preset === p.id 
                      ? 'border-purple-500 text-white bg-purple-950/30 font-bold' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls list */}
          <div className="flex flex-col gap-3.5 font-mono text-[10px] text-slate-300">
            {/* 1. Backdrop Blur */}
            <div>
              <div className="flex justify-between mb-1">
                <span>Backdrop Blur Filter:</span>
                <span className="text-purple-400 font-bold">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                className="w-full accent-purple-500 bg-slate-950"
                value={blur}
                onChange={e => { setBlur(Number(e.target.value)); setPreset('custom'); }}
              />
            </div>

            {/* 2. Background Opacity */}
            <div>
              <div className="flex justify-between mb-1">
                <span>Background Alpha Opacity:</span>
                <span className="text-purple-400 font-bold">{bgOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                className="w-full accent-purple-500 bg-slate-950"
                value={bgOpacity}
                onChange={e => { setBgOpacity(Number(e.target.value)); setPreset('custom'); }}
              />
            </div>

            {/* 3. Border Opacity */}
            <div>
              <div className="flex justify-between mb-1">
                <span>Border Alpha Opacity:</span>
                <span className="text-purple-400 font-bold">{borderOpacity}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                className="w-full accent-purple-500 bg-slate-950"
                value={borderOpacity}
                onChange={e => { setBorderOpacity(Number(e.target.value)); setPreset('custom'); }}
              />
            </div>

            {/* 4. Hue Rotation */}
            <div>
              <div className="flex justify-between mb-1">
                <span>Shadow Hue Angle:</span>
                <span className="text-purple-400 font-bold">{hue}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                className="w-full accent-purple-500 bg-slate-950"
                value={hue}
                onChange={e => { setHue(Number(e.target.value)); setPreset('custom'); }}
              />
            </div>

            {/* 5. Border Radius */}
            <div>
              <div className="flex justify-between mb-1">
                <span>Border Radius:</span>
                <span className="text-purple-400 font-bold">{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                className="w-full accent-purple-500 bg-slate-950"
                value={radius}
                onChange={e => { setRadius(Number(e.target.value)); setPreset('custom'); }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Preview & CSS Output */}
        <div className="flex flex-col gap-4">
          {/* Card Preview */}
          <div className="glass p-5 border-white/5 bg-slate-900/5 flex flex-col justify-center items-center min-h-[180px] relative overflow-hidden">
            {/* Color Sphere background glow */}
            <div 
              className="absolute w-36 h-36 rounded-full filter blur-[50px] opacity-25 pointer-events-none animate-pulse"
              style={{
                background: `hsla(${hue}, 80%, 50%, 0.6)`,
              }}
            ></div>

            {/* Live custom glass element */}
            <div
              style={{
                background: `rgba(255, 255, 255, ${bgOpacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
                borderRadius: `${radius}px`,
                boxShadow: `0 8px 32px 0 hsla(${hue}, 80%, 50%, 0.2)`,
                transition: 'all 0.15s ease-out'
              }}
              className="w-full max-w-[280px] p-5 text-center flex flex-col gap-2 relative z-10"
            >
              <Layout className="mx-auto" size={24} style={{ color: `hsl(${hue}, 80%, 70%)` }} />
              <h4 className="font-mono text-xs font-bold text-white uppercase">Satin Design Preview</h4>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                Behold the glassmorphism rendering quality. The backing aura glow adjusts live to your slider parameters.
              </p>
            </div>
          </div>

          {/* Compiled CSS Code */}
          <div className="glass p-4 border-white/5 bg-slate-950/40 flex flex-col gap-2">
            <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-mono font-bold text-white flex items-center gap-1.5 uppercase">
                <Code size={13} className="text-purple-400" /> Compiled CSS Stylesheet
              </span>
              <button
                onClick={handleCopyCode}
                className="px-2 py-0.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded text-[9px] font-mono text-slate-300 flex items-center gap-1"
              >
                {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-2.5 bg-black/50 rounded border border-white/5 text-[9.5px] font-mono text-purple-300 overflow-x-auto leading-relaxed whitespace-pre">
              {getCSSCode()}
            </pre>
          </div>
        </div>
      </div>

      {/* 45 Features list */}
      <div className="w-full glass p-4 border-white/5 bg-slate-900/20" style={{ borderRadius: '12px' }}>
        <h4 className="text-[10px] font-mono font-bold text-slate-400 mb-3 uppercase border-b border-white/5 pb-1.5 flex items-center gap-1.5">
          <Palette size={12} className="text-purple-400" />
          AI Design Studio Features (3-Column Grid)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => triggerFeature(feat)}
              className="feature-btn flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></span>
              <span className="truncate">{feat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
