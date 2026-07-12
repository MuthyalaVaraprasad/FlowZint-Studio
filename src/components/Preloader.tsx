import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const statusMessages = [
  'Initializing workspace core...',
  'Connecting secure sandbox gateways...',
  'Booting AI natural language modeling...',
  'Scaffolding data dashboard structures...',
  'Syncing user databases...',
  'Optimizing canvas rendering nodes...',
  'Ready to execute.'
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setComplete(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const idx = Math.floor((progress / 100) * (statusMessages.length - 1));
      setStatusIdx(idx);
    } else {
      setStatusIdx(statusMessages.length - 1);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center preloader-bg-animation transition-opacity duration-700"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div 
        className="glass p-8 flex flex-col items-center max-w-md w-11/12 text-center"
        style={{
          border: '1px solid rgba(139, 92, 246, 0.25)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)',
          padding: '2.5rem',
          borderRadius: '16px',
        }}
      >
        {/* Animated Glowing Brain SVG */}
        <div className="mb-6 relative animate-float">
          <svg className="w-24 h-24 text-purple-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01M12 21h3m-3 0H9m3-6v-3m0 0H9m3 0h3m-3-6a9 9 0 019 9c0 1.25-.25 2.44-.71 3.53M12 3a9 9 0 00-9 9c0 1.25.25 2.44.71 3.53M19.5 12a7.5 7.5 0 01-7.5 7.5M4.5 12A7.5 7.5 0 0112 4.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
          <div className="absolute inset-0 bg-purple-500 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        {/* Title */}
        <h1 
          className="glow-text-primary"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: 'white',
            marginBottom: '0.5rem',
          }}
        >
          FLOW ZINT STUDIO
        </h1>
        <p 
          style={{
            color: 'hsl(var(--text-secondary))',
            fontSize: '0.875rem',
            marginBottom: '2rem',
            letterSpacing: '1px'
          }}
        >
          One AI Platform. Infinite Possibilities.
        </p>

        {/* Typing message console */}
        <div 
          className="mb-6 font-mono text-left w-full p-3 rounded"
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
            minHeight: '45px',
            fontSize: '0.8rem',
            color: progress === 100 ? '#10B981' : 'hsl(var(--accent))',
          }}
        >
          <span className="text-purple-400 mr-2">&gt;</span>
          {statusMessages[statusIdx]}
          <span className="cursor-blink"></span>
        </div>

        {/* Progress Bar Container */}
        {!complete ? (
          <div className="w-full">
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
              <span>LOADING WORKSPACE</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div 
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                  boxShadow: '0 0 10px hsl(var(--primary))',
                  borderRadius: '10px',
                  transition: 'width 0.1s ease'
                }}
              />
            </div>
          </div>
        ) : (
          <button 
            onClick={onComplete}
            className="btn-primary animate-pulse-glow"
            style={{
              fontFamily: 'var(--font-mono)',
              width: '100%',
              justifyContent: 'center',
              letterSpacing: '1px',
              padding: '0.9rem',
              fontSize: '1rem',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.6)'
            }}
          >
            ENTER STUDIO
          </button>
        )}
      </div>
    </div>
  );
};
