
import React, { useState, useEffect, useRef } from 'react';
import { View, User } from '../types';
import { BOT_USERS } from '../constants.tsx';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ profiles: User[], hobbyMates: User[] }>({ profiles: [], hobbyMates: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim() || !user) {
      setSearchResults({ profiles: [], hobbyMates: [] });
      return;
    }

    const query = searchQuery.toLowerCase();
    const userHobbyIds = user.hobbies.map(h => h.hobbyId);

    // Filter profiles by name/handle match
    const profiles = BOT_USERS.filter(bot => 
      bot.name.toLowerCase().includes(query) || 
      bot.handle.toLowerCase().includes(query)
    );

    // Filter users with similar hobbies that might not match the name query directly
    // but are relevant if the user is searching for a hobby name
    const hobbyMates = BOT_USERS.filter(bot => 
      bot.hobbies.some(bh => bh.hobbyId.toLowerCase().includes(query)) &&
      !profiles.find(p => p.id === bot.id) // Avoid duplicates
    );

    setSearchResults({ profiles, hobbyMates });
  }, [searchQuery, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user || currentView === 'AUTH' || currentView === 'ONBOARDING') return null;

  const hasResults = searchResults.profiles.length > 0 || searchResults.hobbyMates.length > 0;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-4 md:px-8 h-16 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => setView('FEED')}
      >
        <div className="bg-yellow-400 p-2 rounded-lg font-bold text-xl">🐝</div>
        <span className="text-2xl font-black text-slate-800 tracking-tight hidden sm:block">HobbyHive</span>
      </div>

      <div className="flex-1 max-w-md mx-4 relative" ref={dropdownRef}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search profiles, skills, or hobbies..." 
            className="w-full bg-slate-100 border-none rounded-full py-2.5 px-11 focus:ring-2 focus:ring-yellow-400 transition-all text-sm text-slate-900 placeholder-slate-400 font-medium"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          <div className="absolute left-4 top-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {showDropdown && (searchQuery.trim() !== '') && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] max-h-[80vh] overflow-y-auto">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Searching for: <span className="text-yellow-600">{searchQuery}</span>
              </span>
              {!hasResults && (
                <span className="text-[10px] text-slate-400 font-bold italic">No exact matches found</span>
              )}
            </div>

            {/* Profiles Section */}
            {searchResults.profiles.length > 0 && (
              <div className="p-2">
                <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Matching Profiles</div>
                {searchResults.profiles.map(result => (
                  <div 
                    key={result.id}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl cursor-pointer transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      setSearchQuery('');
                      alert(`Navigating to ${result.name}'s profile (Demo)`);
                    }}
                  >
                    <img src={result.avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm leading-tight truncate">{result.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{result.handle} • {result.city}</p>
                    </div>
                    <div className="flex gap-1">
                      {result.hobbies.slice(0, 1).map(h => (
                        <span key={h.hobbyId} className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded uppercase font-bold text-slate-600">
                          {h.hobbyId}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Hobby Mates Section */}
            {searchResults.hobbyMates.length > 0 && (
              <div className="p-2 border-t border-slate-50">
                <div className="px-3 py-1 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Found via Hobbies</div>
                {searchResults.hobbyMates.map(result => (
                  <div 
                    key={result.id}
                    className="flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-xl cursor-pointer transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      setSearchQuery('');
                      alert(`Navigating to ${result.name}'s profile (Demo)`);
                    }}
                  >
                    <img src={result.avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-sm leading-tight truncate">{result.name}</h4>
                      <p className="text-xs text-slate-500 truncate">Expert in {result.hobbies[0].hobbyId}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!hasResults && (
              <div className="p-8 text-center text-slate-400">
                <span className="text-3xl block mb-2">🔎</span>
                <p className="text-sm font-medium">Try searching for "Coding", "Lens", or a city like "Austin"</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('FEED')}
          className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${currentView === 'FEED' ? 'text-yellow-600 bg-yellow-50' : 'text-slate-600'}`}
        >
          🏠
        </button>
        <button 
          onClick={() => setView('GROUP')}
          className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${currentView === 'GROUP' ? 'text-yellow-600 bg-yellow-50' : 'text-slate-600'}`}
        >
          👥
        </button>
        <div 
          onClick={() => setView('PROFILE')}
          className={`w-10 h-10 rounded-full border-2 cursor-pointer overflow-hidden transition-all hover:scale-105 ${currentView === 'PROFILE' ? 'border-yellow-400' : 'border-transparent'}`}
        >
          <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
