
import React, { useState, useEffect } from 'react';
import { View, User, HobbyConfig } from './types';
import { MOCK_USER } from './constants.tsx';
import Navbar from './components/Navbar';
import AuthView from './views/AuthView';
import OnboardingView from './views/OnboardingView';
import FeedView from './views/FeedView';
import ProfileView from './views/ProfileView';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('AUTH');
  const [user, setUser] = useState<User | null>(null);

  // Mock persistence check
  useEffect(() => {
    const saved = localStorage.getItem('hobbyhive_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setView('FEED');
    }
  }, []);

  const handleLogin = (location: { state: string, city: string }) => {
    // In a real app, this would be actual auth
    // We pass location along to onboarding
    localStorage.setItem('temp_location', JSON.stringify(location));
    setView('ONBOARDING');
  };

  const handleOnboardingComplete = (selections: HobbyConfig[]) => {
    const tempLocation = JSON.parse(localStorage.getItem('temp_location') || '{"state": "CA", "city": "San Francisco"}');
    const newUser = { 
      ...MOCK_USER, 
      hobbies: selections,
      state: tempLocation.state,
      city: tempLocation.city
    };
    setUser(newUser);
    localStorage.setItem('hobbyhive_user', JSON.stringify(newUser));
    setView('FEED');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('hobbyhive_user', JSON.stringify(updatedUser));
  };

  const renderView = () => {
    switch (currentView) {
      case 'AUTH':
        return <AuthView onLogin={handleLogin} />;
      case 'ONBOARDING':
        return <OnboardingView onComplete={handleOnboardingComplete} />;
      case 'FEED':
        return user ? <FeedView user={user} /> : null;
      case 'PROFILE':
        return user ? <ProfileView user={user} onUpdate={handleUserUpdate} /> : null;
      case 'GROUP':
        return user ? <FeedView user={user} /> : null;
      default:
        return <FeedView user={user!} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentView={currentView} setView={setView} user={user} />
      <main className="animate-in fade-in duration-500">
        {renderView()}
      </main>

      {/* Quick Access Mobile Nav */}
      {user && currentView !== 'AUTH' && currentView !== 'ONBOARDING' && (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-around p-4 z-50">
          <button onClick={() => setView('FEED')} className={`text-2xl ${currentView === 'FEED' ? 'text-yellow-400 scale-110' : 'text-slate-400'}`}>🏠</button>
          <button onClick={() => setView('GROUP')} className={`text-2xl ${currentView === 'GROUP' ? 'text-yellow-400 scale-110' : 'text-slate-400'}`}>👥</button>
          <button onClick={() => setView('PROFILE')} className={`text-2xl ${currentView === 'PROFILE' ? 'text-yellow-400 scale-110' : 'text-slate-400'}`}>👤</button>
        </div>
      )}
    </div>
  );
};

export default App;
