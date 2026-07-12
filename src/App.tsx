import React, { useState } from 'react';
import { Background3D } from './components/Background3D';
import { Preloader } from './components/Preloader';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/Dashboard';
import { CursorAnimation } from './components/CursorAnimation';

type ScreenState = 'preloader' | 'signin' | 'dashboard';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('preloader');
  const [user, setUser] = useState({
    name: 'Admin',
    picture: '',
    email: 'admin@flowzint.in'
  });

  const handlePreloaderComplete = () => {
    setScreen('signin');
  };

  const handleSignInSuccess = (profile?: { name: string; email: string; picture: string }) => {
    if (profile) {
      setUser(profile);
    }
    setScreen('dashboard');
  };

  const handleSignOut = () => {
    setUser({ name: 'Admin', picture: '', email: 'admin@flowzint.in' });
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
        <Dashboard onSignOut={handleSignOut} user={user} setUser={setUser} />
      )}
    </>
  );
};

export default App;
