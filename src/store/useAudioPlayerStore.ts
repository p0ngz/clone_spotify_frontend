import { create } from "zustand";
import type { Song } from "../types/song.types";

interface AudioPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndexSong: number;
  isLoop: boolean;
  isRandom: boolean;
  volume: number;

  playSong: (song: Song) => void;
  setQueueAndPlay: (song: Song, queue: Song[]) => void;

  pause: () => void;
  resume: () => void;

  previous: () => void;
  next: () => void;
  toggleLoop: () => void;
  toggleRandom: () => void;
  volumeLevelHandler: (level: number) => void;
}
export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndexSong: 0,
  isLoop: false,
  isRandom: false,
  isRepeatMode: false,
  volume: 80,
  playSong: (song: Song) => {
    const { queue } = get();

    const index = queue.findIndex((s) => s._id === song._id);

    if (index !== -1) {
      set({
        currentSong: song,
        currentIndexSong: index,
        isPlaying: true,
      });
    } else {
      set({
        currentSong: song,
        currentIndexSong: 0,
        isPlaying: true,
      });
    }
  },
  setQueueAndPlay: (song: Song, queue: Song[]) => {
    const index = queue.findIndex((s) => s._id === song._id);

    set({
      queue,
      currentSong: song,
      currentIndexSong: index !== -1 ? index : 0,
      isPlaying: true,
    });
  },
  pause: () => {
    set({
      isPlaying: false,
    });
  },
  resume: () => {
    set({ isPlaying: true });
  },
  previous: () => {
    const { isLoop, isRandom, queue, currentIndexSong } = get();

    if (queue.length === 0) return;

    if (!isLoop && !isRandom) {
      // no loop, no random - go to previous song
      if (currentIndexSong - 1 >= 0) {
        const prevIndex = currentIndexSong - 1;
        if (queue[prevIndex]) {
          set({
            currentSong: queue[prevIndex],
            currentIndexSong: prevIndex,
          });
        }
      } else {
        // at beginning, stay at first song
        set({
          currentSong: queue[0],
          currentIndexSong: 0,
        });
      }
    } else if (isLoop && !isRandom) {
      // loop enabled, no random
      if (currentIndexSong - 1 >= 0) {
        const prevIndex = currentIndexSong - 1;
        set({
          currentSong: queue[prevIndex],
          currentIndexSong: prevIndex,
        });
      } else {
        // at beginning, go to last song
        const lastIndex = queue.length - 1;
        set({
          currentSong: queue[lastIndex],
          currentIndexSong: lastIndex,
        });
      }
    } else {
      // random
      const randomIndex = Math.floor(Math.random() * queue.length);
      set({
        currentSong: queue[randomIndex],
        currentIndexSong: randomIndex,
      });
    }
  },
  next: () => {
    const { isLoop, isRandom, queue, currentIndexSong } = get();
    if (queue.length === 0) return;

    if (isRandom) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      set({
        currentSong: queue[randomIndex],
        currentIndexSong: randomIndex,
      });
      return;
    }

    const nextIndex = currentIndexSong + 1;

    if (nextIndex < queue.length) {
      set({
        currentSong: queue[nextIndex],
        currentIndexSong: nextIndex,
      });
    } else if (isLoop) {
      set({
        currentSong: queue[0],
        currentIndexSong: 0,
      });
    }
  },
  toggleLoop: () => {
    set((state) => ({ isLoop: !state.isLoop }));
  },
  toggleRandom: () => {
    set((state) => ({ isRandom: !state.isRandom }));
  },

  volumeLevelHandler: (level: number) => {
    set({ volume: level });
  },
}));
