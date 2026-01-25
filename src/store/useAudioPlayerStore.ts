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

  play: (song: Song, queue: Song[]) => void;
  pause: () => void;
  resume: () => void;

  previous: () => void;
  next: () => void;

  volumeLevelHandler: (level: number) => void;
}
export const useAudioPlayerStore = create<AudioPlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndexSong: 0,
  isLoop: false,
  isRandom: false,
  volume: 80,
  play: (song: Song, queue: Song[]) => {
    set({
      currentSong: song,
      queue,
      currentIndexSong: queue.findIndex((s) => s._id === song._id),
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
      // random enabled - pick random song
      const randomIndex = Math.floor(Math.random() * queue.length);
      set({
        currentSong: queue[randomIndex],
        currentIndexSong: randomIndex,
      });
    }
  },
  next: () => {
    const { isLoop, isRandom, queue, currentIndexSong } = get();
    if (!isLoop && !isRandom) {
      // no loop, no random
      if (currentIndexSong + 1 < queue.length) {
        const nextIndex = currentIndexSong + 1;
        if (queue[nextIndex]) {
          set({
            currentSong: queue[nextIndex],
            currentIndexSong: nextIndex,
          });
        }
      }
      //   loop, no random
      else if (isLoop && !isRandom) {
        if (currentIndexSong + 1 < queue.length) {
          const nextIndex = queue[0]; //back to first song
          set({
            currentSong: nextIndex,
            currentIndexSong: 0,
          });
        } else {
          const nextIndex = currentIndexSong + 1;
          set({
            currentSong: queue[nextIndex],
            currentIndexSong: nextIndex,
          });
        }
        // loop, random
      } else {
        const randomIndex = Math.floor(Math.random() * queue.length);
        set({
          currentSong: queue[randomIndex],
          currentIndexSong: randomIndex,
        });
      }
    }
  },

  volumeLevelHandler: (level: number) => {
    set({ volume: level });
  },
}));
