import { songService } from "../service/songService";
import type { Song } from "../types/song.types";
import { create } from "zustand";

interface SongState {
  songs: Song[];
  song: Song | null;
  getAllSongs: () => Promise<Song[] | undefined>;
  getSongById: (id: string) => Promise<Song | undefined>;
  getSongByAlbumId: (albumId: string) => Promise<Song[] | undefined>;
  isLoading: boolean;
  error: string | null;
}

export const useSongStore = create<SongState>((set) => ({
  song: null,
  songs: [],
  isLoading: false,
  error: null,

  getAllSongs: async () => {
    set({ isLoading: true, error: null });

    try {
      const songs = await songService.getAllSongs();
      set({ songs: songs || [], isLoading: false });
      return songs;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },

  getSongById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const song = await songService.getSongById(id);
      set({ song: song || null, isLoading: false });
      return song;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
  getSongByAlbumId: async (albumId: string) => {
    set({ isLoading: true, error: null });

    try {
      const songs = await songService.getSongByAlbumId(albumId);
      set({ songs: songs || [], isLoading: false });
      return songs;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
}));
