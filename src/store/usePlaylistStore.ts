import { playlistService } from "../service/playlistService";
import { create } from "zustand";
import type { Playlist } from "../types/playlist.types";

interface PlaylistState {
  playlists: Playlist[];
  playlist: Playlist | null;
  getAllPlaylists: () => Promise<Playlist[] | undefined>;
  getPlaylistById: (id: string) => Promise<Playlist | undefined>;
  getPlaylistByUserId: (userId: string) => Promise<Playlist[] | undefined>;
  hardDeletePlaylistById: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  playlist: {} as Playlist,
  isLoading: false,
  error: null,
  getAllPlaylists: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await playlistService.getAllPlaylist();
      set({ playlists: response?.playlists || [], isLoading: false });
      return response?.playlists;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
  getPlaylistById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const playlist = await playlistService.getPlaylistById(id);
      set({ playlist: playlist || null, isLoading: false });
      return playlist;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
  getPlaylistByUserId: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await playlistService.getPlaylistByUserId(userId);
      console.log("response playlists: ", response?.playlists);
      set({ playlists: response?.playlistsByUserId?.playlists || [], isLoading: false });
      return response?.playlists;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
  hardDeletePlaylistById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await playlistService.hardDeletePlaylistById(id);
      set({ isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      throw err;
    }
  },
}));
