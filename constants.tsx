
import React from 'react';
import { Hobby, SkillLevel, User, Post } from './types';

export const HOBBIES: Hobby[] = [
  { id: 'coding', name: 'Coding', icon: '💻', description: 'Build the future with code.', memberCount: 1250, category: 'Tech' },
  { id: 'photography', name: 'Photography', icon: '📸', description: 'Capture moments that matter.', memberCount: 840, category: 'Art' },
  { id: 'fitness', name: 'Fitness', icon: '🏋️', description: 'Health is wealth.', memberCount: 2100, category: 'Lifestyle' },
  { id: 'music', name: 'Music', icon: '🎸', description: 'The language of the soul.', memberCount: 950, category: 'Art' },
  { id: 'robotics', name: 'Robotics', icon: '🤖', description: 'Hardware meets software.', memberCount: 420, category: 'Tech' },
  { id: 'gaming', name: 'Gaming', icon: '🎮', description: 'Play, compete, and connect.', memberCount: 3500, category: 'Entertainment' },
  { id: 'cooking', name: 'Cooking', icon: '🍳', description: 'The art of flavors.', memberCount: 1100, category: 'Lifestyle' },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  handle: '@arivera',
  bio: 'Passionate about building cool stuff and capturing urban landscapes.',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80',
  hobbies: [
    { hobbyId: 'coding', level: SkillLevel.INTERMEDIATE },
    { hobbyId: 'photography', level: SkillLevel.BEGINNER }
  ],
  skillPoints: 1250,
  badges: ['Early Adopter', 'Bug Squasher', 'Pixel Perfect'],
  state: 'Maharashtra',
  city: 'Mumbai',
  skillSwap: {
    offered: 'React & Tailwind',
    needed: 'Basic Photography',
    description: 'Willing to build you a portfolio site in exchange for learning how to use a DSLR!'
  }
};

export const BOT_USERS: User[] = [
  {
    id: 'bot1',
    name: 'Aarav Sharma',
    handle: '@aarav_codes',
    bio: 'Full-stack developer from Bangalore. Building the next big thing in AI.',
    avatar: 'https://i.pravatar.cc/150?u=aarav',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    hobbies: [{ hobbyId: 'coding', level: SkillLevel.PRO }],
    skillPoints: 5200,
    badges: ['Top Contributor', 'Logic King'],
    state: 'Karnataka',
    city: 'Bangalore'
  },
  {
    id: 'bot2',
    name: 'Ishani Patel',
    handle: '@ishani_lens',
    bio: 'Documentary Photographer. Exploring the rural heart of India.',
    avatar: 'https://i.pravatar.cc/150?u=ishani',
    banner: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1200&q=80',
    hobbies: [{ hobbyId: 'photography', level: SkillLevel.PRO }],
    skillPoints: 3800,
    badges: ['Golden Shutter', 'Light Bender'],
    state: 'Gujarat',
    city: 'Ahmedabad'
  },
  {
    id: 'bot3',
    name: 'Ananya Iyer',
    handle: '@ananya_bakes',
    bio: 'Pastry chef exploring the intersection of spices and French baking.',
    avatar: 'https://i.pravatar.cc/150?u=ananya',
    banner: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    hobbies: [{ hobbyId: 'cooking', level: SkillLevel.INTERMEDIATE }],
    skillPoints: 2400,
    badges: ['Flavor Guru'],
    state: 'Tamil Nadu',
    city: 'Chennai'
  },
  {
    id: 'bot4',
    name: 'Rohan Gupta',
    handle: '@rohan_fits',
    bio: 'Marathon runner and calisthenics fan. Discipline over motivation.',
    avatar: 'https://i.pravatar.cc/150?u=rohan',
    banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    hobbies: [{ hobbyId: 'fitness', level: SkillLevel.PRO }],
    skillPoints: 4600,
    badges: ['Iron Will', 'Consistency Pro'],
    state: 'Maharashtra',
    city: 'Pune'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'bot2',
    userName: 'Ishani Patel',
    userAvatar: 'https://i.pravatar.cc/150?u=ishani',
    hobbyId: 'photography',
    content: 'Sunrise at the Taj Mahal. The soft light hitting the marble is something every photographer must witness once. ✨',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date(Date.now() - 3600000),
    likes: 245,
    comments: [],
    isProgressUpdate: false,
    skillTag: 'GoldenHour'
  },
  {
    id: 'p2',
    userId: 'bot1',
    userName: 'Aarav Sharma',
    userAvatar: 'https://i.pravatar.cc/150?u=aarav',
    hobbyId: 'coding',
    content: 'Day 12 of #HobbyHive Challenge: Finally got my Rust backend to communicate with the React frontend using gRPC. Speed is incredible! 🦀🔥',
    timestamp: new Date(Date.now() - 7200000),
    likes: 189,
    comments: [],
    isProgressUpdate: true,
    skillTag: 'SystemsDesign'
  },
  {
    id: 'p3',
    userId: 'bot3',
    userName: 'Ananya Iyer',
    userAvatar: 'https://i.pravatar.cc/150?u=ananya',
    hobbyId: 'cooking',
    content: 'Experimenting with Cardamom-infused chocolate mousse. The aromatics really elevate the cocoa. 🍫🍃',
    image: 'https://images.unsplash.com/photo-1528451631455-871d37803f29?auto=format&fit=crop&w=800&q=80',
    timestamp: new Date(Date.now() - 15000000),
    likes: 92,
    comments: [],
    isProgressUpdate: true,
    skillTag: 'Fusion'
  }
];
