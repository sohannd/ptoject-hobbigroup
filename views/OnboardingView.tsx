
import React, { useState } from 'react';
import { HOBBIES } from '../constants.tsx';
import { SkillLevel, HobbyConfig } from '../types';

interface OnboardingViewProps {
  onComplete: (selections: HobbyConfig[]) => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<HobbyConfig[]>([]);

  const toggleHobby = (hobbyId: string) => {
    setSelected(prev => {
      const exists = prev.find(p => p.hobbyId === hobbyId);
      if (exists) {
        return prev.filter(p => p.hobbyId !== hobbyId);
      }
      return [...prev, { hobbyId, level: SkillLevel.BEGINNER }];
    });
  };

  const setLevel = (hobbyId: string, level: SkillLevel) => {
    setSelected(prev => prev.map(p => p.hobbyId === hobbyId ? { ...p, level } : p));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">What's your passion?</h2>
          <p className="text-slate-500">Select at least one hobby to personalize your experience.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {HOBBIES.map(hobby => {
            const isSelected = selected.some(p => p.hobbyId === hobby.id);
            return (
              <div 
                key={hobby.id}
                onClick={() => toggleHobby(hobby.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-slate-100 hover:border-yellow-200'
                }`}
              >
                <span className="text-3xl block mb-2">{hobby.icon}</span>
                <h4 className="font-bold text-slate-800">{hobby.name}</h4>
                <p className="text-[10px] text-slate-400 uppercase font-black">{hobby.category}</p>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div className="space-y-6 mb-10 animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-lg font-bold text-slate-800">Set your skill levels:</h3>
            {selected.map(sel => {
              const hobby = HOBBIES.find(h => h.id === sel.hobbyId)!;
              return (
                <div key={sel.hobbyId} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <span className="font-bold flex items-center gap-2">
                    {hobby.icon} {hobby.name}
                  </span>
                  <div className="flex gap-2">
                    {Object.values(SkillLevel).map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setLevel(sel.hobbyId, lvl)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          sel.level === lvl 
                            ? 'bg-yellow-400 text-slate-900' 
                            : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => onComplete(selected)}
          disabled={selected.length === 0}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default OnboardingView;
