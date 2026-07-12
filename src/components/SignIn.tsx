import React, { useState } from 'react';

interface SignInProps {
  onSuccess: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div 
        className={`glass w-full max-w-md p-8 relative transition-all duration-300 ${error ? 'animate-bounce' : ''}`}
        style={{
          border: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
        }}
      >
        {/* Glow accent */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full filter blur-[80px] opacity-20 pointer-events-none"></div>

        {/* Title & Sub */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01M12 21h3m-3 0H9m3-6v-3m0 0H9m3 0h3m-3-6a9 9 0 019 9c0 1.25-.25 2.44-.71 3.53M12 3a9 9 0 00-9 9c0 1.25.25 2.44.71 3.53M19.5 12a7.5 7.5 0 01-7.5 7.5M4.5 12A7.5 7.5 0 0112 4.5" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
              Flow Zint
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>
            Sign in to access your intelligent workspace
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button 
            type="button" 
            onClick={onSuccess}
            className="flex items-center justify-center gap-3 w-full p-2.5 rounded-lg border font-medium text-sm transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.01c2.34-2.16 3.69-5.32 3.69-8.74Z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.12c-1.12.75-2.54 1.19-3.95 1.19-3.05 0-5.63-2.06-6.55-4.83H1.31v3.22A12 12 0 0 0 12 24Z"/>
              <path fill="#FBBC05" d="M5.45 14.33a7.14 7.14 0 0 1 0-4.66V6.45H1.31a12 12 0 0 0 0 11.1l4.14-3.22Z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A12 12 0 0 0 1.31 6.45l4.14 3.22c.92-2.77 3.5-4.92 6.55-4.92Z"/>
            </svg>
            Continue with Google
          </button>

          <button 
            type="button" 
            onClick={onSuccess}
            className="flex items-center justify-center gap-3 w-full p-2.5 rounded-lg border font-medium text-sm transition-all duration-200"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {/* GitHub Icon SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-3 my-5">
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
          <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))', fontFamily: 'var(--font-mono)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-left">
            <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'hsl(var(--text-secondary))' }}>
              Email address
            </label>
            <input 
              type="email" 
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 text-left">
            <div className="flex justify-between items-center">
              <label style={{ fontSize: '0.8rem', fontWeight: 500, color: 'hsl(var(--text-secondary))' }}>
                Password
              </label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'hsl(var(--primary))', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" style={{ accentColor: 'hsl(var(--primary))' }} />
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '1rem',
              padding: '0.8rem',
              fontSize: '0.95rem'
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"></path>
                </svg>
                Authorizing...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{' '}
          <a href="#" onClick={onSuccess} style={{ color: 'hsl(var(--primary))', textDecoration: 'none', fontWeight: 600 }}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};
