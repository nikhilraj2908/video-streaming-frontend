export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  subscriberCount: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  dislikes: number;
  uploadedBy: User;
  uploadedAt: Date;
  tags: string[];
  category: string;
  isPublic: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  videoId: string;
  parentId?: string;
  likes: number;
  createdAt: Date;
  replies?: Comment[];
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  videos: Video[];
  createdBy: User;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  subscriberId: string;
  subscribedToId: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface VideoState {
  currentVideo: Video | null;
  isPlaying: boolean;
  isMinimized: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

export type Theme = 'light' | 'dark' | 'system';

export interface SearchFilters {
  duration?: 'short' | 'medium' | 'long';
  uploadDate?: 'hour' | 'today' | 'week' | 'month' | 'year';
  sortBy?: 'relevance' | 'date' | 'views' | 'rating';
  type?: 'video' | 'channel' | 'playlist';
}