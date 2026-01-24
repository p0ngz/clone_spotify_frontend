import { playlistSongService } from "../service/playlistSongService";
import { create } from "zustand";
import type { PlaylistSong } from "../types/playlistSong.types";

interface PlaylistSongState {
  playlistSongs: PlaylistSong[];
  playlistSong: PlaylistSong | null;
  getAllPlaylistSongs: () => Promise<PlaylistSong[] | undefined>;
  getPlaylistSongById: (id: string) => Promise<PlaylistSong | undefined>;
  getPlaylistSongByPlaylistId: (
    playlistId: string,
  ) => Promise<PlaylistSong[] | undefined>;
  isLoading: boolean;
  error: string | null;
}

export const usePlaylistSongStore = create<PlaylistSongState>((set) => ({
  playlistSongs: [],
  playlistSong: null,
  isLoading: false,
  error: null,

  getAllPlaylistSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await playlistSongService.getAllPlaylistSongs();
      set({ playlistSongs: data || [], isLoading: false });
      return data;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },

  getPlaylistSongById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await playlistSongService.getPlaylistSongById(id);
      set({ playlistSong: data || null, isLoading: false });
      return data;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },

  getPlaylistSongByPlaylistId: async (playlistId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await playlistSongService.getPlaylistSongByPlaylistId(playlistId);
      set({ playlistSongs: data || [], isLoading: false });
      return data;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
}));
