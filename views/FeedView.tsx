
import React, { useState, useRef, useMemo } from 'react';
import { MOCK_POSTS, HOBBIES, BOT_USERS } from '../constants.tsx';
import { Post, User, SkillLevel } from '../types';
import PostCard from '../components/PostCard';
import { getHobbyMentorAdvice } from '../services/geminiService';

interface FeedViewProps {
  user: User;
}

const FeedView: React.FC<FeedViewProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedHobby, setSelectedHobby] = useState(user.hobbies[0].hobbyId);
  const [isProgress, setIsProgress] = useState(false);
  const [mentorAdvice, setMentorAdvice] = useState<string | null>(null);
  const [isGettingAdvice, setIsGettingAdvice] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const recommendedUsers = useMemo(() => {
    const userHobbyIds = user.hobbies.map(h => h.hobbyId);
    return BOT_USERS.filter(bot => 
      bot.hobbies.some(bh => userHobbyIds.includes(bh.hobbyId))
    ).slice(0, 4);
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !selectedImage) return;
    setIsPosting(true);
    
    setTimeout(() => {
      const newPost: Post = {
        id: `p-${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        hobbyId: selectedHobby,
        content: newPostContent,
        image: selectedImage || undefined,
        timestamp: new Date(),
        likes: 0,
        comments: [],
        isProgressUpdate: isProgress,
        skillTag: isProgress ? 'Level Up' : 'Shared'
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setSelectedImage(null);
      setIsProgress(false);
      setIsPosting(false);
    }, 800);
  };

  const getMentorHelp = async () => {
    setIsGettingAdvice(true);
    const hobby = HOBBIES.find(h => h.id === selectedHobby);
    const level = user.hobbies.find(h => h.hobbyId === selectedHobby)?.level || SkillLevel.BEGINNER;
    const advice = await getHobbyMentorAdvice(hobby?.name || '', level, "Give me a creative project idea for today.");
    setMentorAdvice(advice);
    setIsGettingAdvice(false);
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-10">
      {/* Left Sidebar: Hobby Navigator */}
      <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 h-fit">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Your Hives</h3>
          </div>
          <div className="p-3 space-y-1">
            {user.hobbies.map(uh => {
              const hobby = HOBBIES.find(h => h.id === uh.hobbyId);
              if (!hobby) return null;
              const isActive = selectedHobby === hobby.id;
              return (
                <button
                  key={hobby.id}
                  onClick={() => setSelectedHobby(hobby.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                    isActive ? 'bg-yellow-400 text-slate-900 shadow-md font-bold scale-[1.02]' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{hobby.icon}</span>
                    <span className="text-sm">{hobby.name}</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black uppercase ${
                    isActive ? 'bg-yellow-500' : 'bg-slate-100'
                  }`}>
                    {uh.level}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Mentor Widget */}
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-yellow-400/20 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 text-xl font-bold shadow-lg">AI</div>
              <div>
                <h4 className="font-bold text-sm">Hobby Mentor</h4>
                <p className="text-[10px] text-yellow-400 font-black uppercase">Powered by Gemini</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">Ask for a project idea or technical advice for your <span className="text-white font-bold">{HOBBIES.find(h => h.id === selectedHobby)?.name}</span>.</p>
            <button 
              onClick={getMentorHelp}
              disabled={isGettingAdvice}
              className="w-full bg-white text-slate-900 text-xs font-black py-3 rounded-xl hover:bg-yellow-400 transition-all active:scale-95 shadow-lg"
            >
              {isGettingAdvice ? 'Buzzing...' : 'Get Today\'s Task'}
            </button>
            {mentorAdvice && (
              <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-slate-200 italic animate-in fade-in zoom-in-95">
                "{mentorAdvice}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Center: Feed & Composer */}
      <div className="lg:col-span-6 space-y-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex gap-5">
            <img src={user.avatar} className="w-14 h-14 rounded-[1.25rem] object-cover ring-4 ring-slate-50 shadow-sm" />
            <div className="flex-1 space-y-4">
              <div className="relative">
                <textarea
                  placeholder={`What's your latest win in ${HOBBIES.find(h => h.id === selectedHobby)?.name}?`}
                  className="w-full bg-slate-50 rounded-[1.5rem] p-6 text-slate-800 text-sm resize-none focus:outline-none focus:ring-4 focus:ring-yellow-400/20 min-h-[140px] border border-slate-100 transition-all"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>

              {selectedImage && (
                <div className="relative rounded-3xl overflow-hidden group shadow-2xl ring-1 ring-slate-200">
                  <img src={selectedImage} alt="Preview" className="w-full max-h-[400px] object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-xl hover:bg-red-600 active:scale-90 transition-all"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">📸</span>
                <span className="text-xs font-bold text-slate-500">Photo</span>
              </button>
              
              <div className="h-6 w-px bg-slate-100 mx-2"></div>
              
              <button 
                onClick={() => setIsProgress(!isProgress)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isProgress ? 'bg-green-50 text-green-600' : 'hover:bg-slate-50 text-slate-500'}`}
              >
                <span className={`text-xl transition-all ${isProgress ? 'scale-125' : ''}`}>📈</span>
                <span className="text-xs font-bold">Progress</span>
              </button>
            </div>

            <button 
              onClick={handleCreatePost}
              disabled={(!newPostContent.trim() && !selectedImage) || isPosting}
              className={`px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl ${
                (!newPostContent.trim() && !selectedImage) || isPosting 
                  ? 'bg-slate-100 text-slate-300' 
                  : 'bg-yellow-400 text-slate-900 hover:bg-yellow-500 hover:shadow-yellow-200'
              }`}
            >
              {isPosting ? 'Buzzing...' : 'Share Progress'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {posts
            .filter(p => p.hobbyId === selectedHobby)
            .map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>

      {/* Right Sidebar: Discovery */}
      <div className="hidden lg:block lg:col-span-3 space-y-8 sticky top-24 h-fit">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="text-yellow-500">✨</span> Nearby Hobbyists
          </h3>
          <div className="space-y-6">
            {recommendedUsers.map(rec => (
              <div key={rec.id} className="group flex items-center gap-4 cursor-pointer">
                <img src={rec.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50 group-hover:ring-yellow-400 transition-all" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-yellow-600 transition-colors">{rec.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{rec.city}</p>
                </div>
                <button className="bg-slate-900 text-white text-[10px] font-black px-3 py-2 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-all">Connect</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="font-black text-xl mb-2 italic">Skill Swap</h3>
          <p className="text-sm text-indigo-100 leading-relaxed mb-6">Trade your expertise. Learn coding for photography, or cooking for fitness.</p>
          <button className="w-full bg-white text-indigo-600 font-black py-4 rounded-[1.5rem] shadow-xl hover:scale-[1.05] transition-all">Explore Swaps</button>
        </div>
      </div>
    </div>
  );
};

export default FeedView;
