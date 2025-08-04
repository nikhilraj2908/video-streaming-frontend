import { atom } from 'jotai';
import { VideoState } from '@/types';

export const playerAtom = atom<VideoState>({
  currentVideo: null,
  isPlaying: false,
  isMinimized: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
});

export const sidebarCollapsedAtom = atom(false);