
import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: (location: { state: string, city: string }) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('Mumbai');

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs for depth */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]"></div>

      <div className="max-w-md w-full text-center space-y-10 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex bg-yellow-400 w-24 h-24 rounded-[2rem] items-center justify-center shadow-2xl shadow-yellow-200 animate-bounce">
            <span className="text-6xl">🐝</span>
          </div>
          <div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter">HobbyHive</h1>
            <p className="text-lg text-slate-500 font-medium mt-2">Built for Passion, Not for Clout.</p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 space-y-8">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your City</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none transition-all text-sm font-bold"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="text-left space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">State</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none transition-all text-sm font-bold"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            
            <div className="text-left space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="hello@hobbyhive.in"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin({ state, city })}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-2xl hover:shadow-slate-200 text-sm tracking-widest uppercase"
          >
            Join the Hive
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-100 flex-1"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Local & Social</span>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Join 15,000+ hobbyists across India building real skills today. 
          </p>
        </div>

        <div className="flex justify-center gap-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Manifesto</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Safety</span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy</span>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
