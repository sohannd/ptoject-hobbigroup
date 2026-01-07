
import React, { useState, useRef } from 'react';
import { User, SkillLevel, SkillSwap } from '../types';
import { HOBBIES } from '../constants.tsx';

interface ProfileViewProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editAvatar, setEditAvatar] = useState(user.avatar);
  const [editBanner, setEditBanner] = useState(user.banner || 'https://picsum.photos/seed/banner1/1200/400');
  
  // Skill Swap Editing State
  const [editSkillOffered, setEditSkillOffered] = useState(user.skillSwap?.offered || '');
  const [editSkillNeeded, setEditSkillNeeded] = useState(user.skillSwap?.needed || '');
  const [editSkillDesc, setEditSkillDesc] = useState(user.skillSwap?.description || '');
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const updatedSkillSwap: SkillSwap | undefined = (editSkillOffered || editSkillNeeded) ? {
      offered: editSkillOffered,
      needed: editSkillNeeded,
      description: editSkillDesc
    } : undefined;

    onUpdate({
      ...user,
      name: editName,
      bio: editBio,
      avatar: editAvatar,
      banner: editBanner,
      skillSwap: updatedSkillSwap
    });
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="relative group h-48 bg-slate-100 overflow-hidden">
          <img src={editBanner} className="w-full h-full object-cover" alt="Banner" />
          {isEditing && (
            <button 
              onClick={() => bannerInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity"
            >
              📷 Change Banner
            </button>
          )}
          <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setEditBanner)} />
        </div>
        
        <div className="px-8 pb-8 -mt-16 relative">
          <div className="relative group w-32 h-32 mb-4">
            <img src={editAvatar} alt={editName} className="w-full h-full rounded-3xl border-4 border-white shadow-xl object-cover" />
            {isEditing && (
              <button 
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              >
                📷 Change
              </button>
            )}
            <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setEditAvatar)} />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex-1">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-3xl font-black text-slate-900 bg-slate-50 border-b-2 border-yellow-400 focus:outline-none w-full max-w-md p-1"
                />
              ) : (
                <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
              )}
              <p className="text-slate-500 font-medium">{user.handle} • {user.city}, {user.state}</p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-xl shadow-lg hover:bg-yellow-500 transition-all">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="bg-slate-100 text-slate-600 font-bold px-6 py-2 rounded-xl hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-slate-900 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:bg-slate-800 transition-all">
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-6 max-w-2xl">
            {isEditing ? (
              <textarea 
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-slate-700 leading-relaxed focus:ring-2 focus:ring-yellow-400 focus:outline-none min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-slate-700 text-lg leading-relaxed">{user.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-wider text-xs mb-4">Hive Reputation</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Skill Points</span>
                <span className="font-black text-2xl text-yellow-600">{user.skillPoints}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 w-3/4 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400">Top 5% of Hobbyists this month</p>
            </div>
          </div>
        </div>

        {/* Main Column - Skills & Progress */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6">Skills & Passions</h3>
            <div className="space-y-6">
              {user.hobbies.map(uh => {
                const hobby = HOBBIES.find(h => h.id === uh.hobbyId);
                if (!hobby) return null;
                return (
                  <div key={hobby.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 group hover:bg-yellow-50 transition-colors">
                    <span className="text-4xl">{hobby.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-lg text-slate-800">{hobby.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          uh.level === SkillLevel.PRO ? 'bg-purple-100 text-purple-700' :
                          uh.level === SkillLevel.INTERMEDIATE ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {uh.level}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2">
                        <div className={`h-full rounded-full ${
                          uh.level === SkillLevel.PRO ? 'bg-purple-400 w-full' :
                          uh.level === SkillLevel.INTERMEDIATE ? 'bg-blue-400 w-2/3' :
                          'bg-green-400 w-1/3'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skill Swap Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900 text-xl">Skill Swap Offer</h3>
              {!isEditing && (
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Open to trade
                </span>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">I can teach</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Python, Portrait Photography"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      value={editSkillOffered}
                      onChange={(e) => setEditSkillOffered(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">I want to learn</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UI Design, Guitar"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      value={editSkillNeeded}
                      onChange={(e) => setEditSkillNeeded(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Brief Description</label>
                  <textarea 
                    placeholder="How would you like to collaborate?"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none min-h-[80px]"
                    value={editSkillDesc}
                    onChange={(e) => setEditSkillDesc(e.target.value)}
                  />
                </div>
              </div>
            ) : user.skillSwap ? (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
                  <div className="relative pl-4 border-l-4 border-green-400">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Teaching</p>
                    <p className="font-bold text-slate-800 text-lg">{user.skillSwap.offered}</p>
                  </div>
                  <div className="relative pl-4 border-l-4 border-indigo-400">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Learning</p>
                    <p className="font-bold text-slate-800 text-lg">{user.skillSwap.needed}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{user.skillSwap.description}"</p>
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <button className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                    <span>🤝</span> Propose a Swap
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No skill swap offer yet.</p>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-2 text-indigo-500 font-bold hover:underline"
                >
                  Create one now
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 text-xl mb-6">Learning Path</h3>
            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative pl-10">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 bg-yellow-400 rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-800">Completed 30-Day Coding Challenge</h4>
                <p className="text-sm text-slate-500">2 weeks ago • Earned 500 Skill Points</p>
              </div>
              <div className="relative pl-10">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 bg-slate-300 rounded-full border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-800">Photography Basics Certification</h4>
                <p className="text-sm text-slate-500">1 month ago • Verified by Peer Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
