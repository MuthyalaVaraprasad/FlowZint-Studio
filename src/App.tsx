import React, { useState } from 'react';
import { Background3D } from './components/Background3D';
import { Preloader } from './components/Preloader';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { CursorAnimation } from './components/CursorAnimation';

type ScreenState = 'preloader' | 'signin' | 'dashboard';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('preloader');

  const handlePreloaderComplete = () => {
    setScreen('signin');
  };

  const handleSignInSuccess = () => {
    setScreen('dashboard');
  };

  const handleSignOut = () => {
    setScreen('signin');
  };

  return (
    <>
      {/* 3D Plexus background canvas */}
      <Background3D screen={screen} />

      {/* Futuristic cursor particles trail animation */}
      <CursorAnimation />

      {/* Screen States Router */}
      {screen === 'preloader' && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {screen === 'signin' && (
        <SignIn onSuccess={handleSignInSuccess} />
      )}

      {screen === 'dashboard' && (
        <Dashboard onSignOut={handleSignOut} />
      )}
    </>
  );
};

export default App;
