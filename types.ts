
export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  PRO = 'Pro'
}

export interface SkillSwap {
  offered: string;
  needed: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  banner?: string;
  hobbies: HobbyConfig[];
  skillPoints: number;
  badges: string[];
  state?: string;
  city?: string;
  skillSwap?: SkillSwap;
}

export interface HobbyConfig {
  hobbyId: string;
  level: SkillLevel;
}

export interface Hobby {
  id: string;
  name: string;
  icon: string;
  description: string;
  memberCount: number;
  category: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  hobbyId: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  isProgressUpdate: boolean;
  skillTag?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

export interface HobbyEvent {
  id: string;
  title: string;
  date: string;
  type: 'Online' | 'Local';
  hobbyId: string;
}

export type View = 'AUTH' | 'ONBOARDING' | 'FEED' | 'GROUP' | 'PROFILE' | 'SEARCH';
