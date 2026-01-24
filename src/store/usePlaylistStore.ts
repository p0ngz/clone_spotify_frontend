import { playlistService } from "../service/playlistService";
import { create } from "zustand";
import type { Playlist } from "../types/playlist.types";

interface PlaylistState {
  playlists: Playlist[];
  playlist: Playlist | null;
  getAllPlaylists: () => Promise<Playlist[] | undefined>;
  getPlaylistById: (id: string) => Promise<Playlist | undefined>;
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
      const playlists = await playlistService.getAllPlaylist();
      set({ playlists: playlists || [], isLoading: false });
      return playlists;
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
}));
