import React, { useState, useEffect } from 'react';

interface SignInProps {
  onSuccess: (profile?: { name: string; email: string; picture: string }) => void;
}

// REPLACE THIS WITH YOUR GOOGLE CLOUD CONSOLE CLIENT ID
const CLIENT_ID = '492928126668-72gkk1tur8godo2nuqn1cvecasv6kpm1.apps.googleusercontent.com';

export const SignIn: React.FC<SignInProps> = ({ onSuccess }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let checkCount = 0;
    
    const initializeGoogleSignIn = () => {
      const { google } = window as any;
      if (google?.accounts?.id) {
        try {
          google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: (response: any) => {
              setLoading(true);
              // Decode the base64 JWT payload from Google credential token
              try {
                const token = response.credential;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                  atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
                );
                const payload = JSON.parse(jsonPayload);
                
                setTimeout(() => {
                  setLoading(false);
                  onSuccess({
                    name: payload.name || 'Google User',
                    email: payload.email || 'user@gmail.com',
                    picture: payload.picture || ''
                  });
                }, 1000);
              } catch (e) {
                console.error("JWT Decode error: ", e);
                setLoading(false);
                setError(true);
                setTimeout(() => setError(false), 2000);
              }
            },
            auto_select: false,
          });
          
          google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { 
              theme: 'filled_blue', 
              size: 'large', 
              width: 320, 
              shape: 'rectangular',
              text: 'signin_with'
            }
          );
        } catch (err) {
          console.error("Google accounts render button error: ", err);
          setUseFallback(true);
        }
      } else {
        checkCount++;
        // If Google library is not loaded within 2.5s, fall back to mock button
        if (checkCount > 12) {
          setUseFallback(true);
        }
      }
    };

    const timer = setInterval(() => {
      const { google } = window as any;
      if (google?.accounts?.id) {
        initializeGoogleSignIn();
        clearInterval(timer);
      } else {
        checkCount++;
        if (checkCount > 12) {
          setUseFallback(true);
          clearInterval(timer);
        }
      }
    }, 200);

    return () => clearInterval(timer);
  }, [onSuccess]);

  // Mock sign-in fallback for quick developer testing
  const handleMockSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: 'Muthyala Varaprasad',
        email: 'varaprasad@flowzint.in',
        picture: 'https://lh3.googleusercontent.com/a/default-user' // Default placeholder photo
      });
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
        className={`glass w-full max-w-sm p-8 relative transition-all duration-300 ${error ? 'animate-bounce' : ''}`}
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px', color: 'white' }}>
              Flow Zint
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>
            Authorize access to your intelligent workspace
          </p>
        </div>

        {/* Sign In Button Area */}
        <div className="flex flex-col items-center justify-center min-h-[50px] w-full gap-4">
          {loading ? (
            <div className="flex flex-col items-center gap-2 font-mono text-xs text-purple-400">
              <svg className="animate-spin h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"></path>
              </svg>
              <span>Verifying authorization...</span>
            </div>
          ) : (
            <>
              {/* Target div for Google Identity Services Button */}
              <div 
                id="googleSignInButton" 
                className={`w-full flex justify-center ${useFallback ? 'hidden' : ''}`}
              ></div>

              {/* Styled Fallback / Sandbox Google Button */}
              {(useFallback || CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) && (
                <button
                  type="button"
                  onClick={handleMockSignIn}
                  className="flex items-center justify-center gap-3 w-full p-2.5 rounded-lg border font-medium text-sm transition-all duration-200 hover:bg-white/5 active:scale-98"
                  style={{
                    background: '#1a73e8',
                    borderColor: '#1a73e8',
                    color: 'white',
                    cursor: 'pointer',
                    width: '320px',
                    maxWidth: '100%'
                  }}
                >
                  <svg className="w-5 h-5 bg-white rounded-full p-0.5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.01c2.34-2.16 3.69-5.32 3.69-8.74Z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.12c-1.12.75-2.54 1.19-3.95 1.19-3.05 0-5.63-2.06-6.55-4.83H1.31v3.22A12 12 0 0 0 12 24Z"/>
                    <path fill="#FBBC05" d="M5.45 14.33a7.14 7.14 0 0 1 0-4.66V6.45H1.31a12 12 0 0 0 0 11.1l4.14-3.22Z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A12 12 0 0 0 1.31 6.45l4.14 3.22c.92-2.77 3.5-4.92 6.55-4.92Z"/>
                  </svg>
                  Sign in with Google
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
