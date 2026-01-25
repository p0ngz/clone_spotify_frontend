import { playlistSongService } from "../service/playlistSongService";
import { create } from "zustand";
import type { PlaylistSong } from "../types/playlistSong.types";

interface PlaylistMetadata {
  playlist_id: string;
  playlist_name: string;
  playlist_description: string;
  playlist_cover_image: string;
  playlist_cover_public_id: string;
  playlist_is_public: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  total_songs: number;
}

interface PlaylistSongState {
  playlistSongs: PlaylistSong[];
  playlistMetadata: PlaylistMetadata | null;
  playlistSong: PlaylistSong | null;
  getAllPlaylistSongs: () => Promise<PlaylistSong[] | undefined>;
  getPlaylistSongById: (id: string) => Promise<PlaylistSong | undefined>;
  getPlaylistSongByPlaylistId: (
    playlistId: string,
  ) => Promise<PlaylistSong[] | undefined>;
  createPlaylistSong: (
    playlistId: string,
    songId: string,
  ) => Promise<PlaylistSong | undefined>;
  deletePlaylistSongById: (playlistId: string, songId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const usePlaylistSongStore = create<PlaylistSongState>((set) => ({
  playlistSongs: [],
  playlistMetadata: null,
  playlistSong: null,
  isLoading: false,
  error: null,

  getAllPlaylistSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await playlistSongService.getAllPlaylistSongs();
      set({ playlistSongs: response?.playlistSongs || [], isLoading: false });
      return response?.playlistSongs;
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
      const response =
        await playlistSongService.getPlaylistSongByPlaylistId(playlistId);
      const playlistData = response?.playlist;
      set({
        playlistSongs: playlistData?.songs || [],
        playlistMetadata: {
          playlist_id: playlistData?.playlist_id || "",
          playlist_name: playlistData?.playlist_name || "",
          playlist_description: playlistData?.playlist_description || "",
          playlist_cover_image: playlistData?.playlist_cover_image || "",
          playlist_cover_public_id:
            playlistData?.playlist_cover_public_id || "",
          playlist_is_public: playlistData?.playlist_is_public || false,
          user_id: playlistData?.user_id || "",
          created_at: playlistData?.created_at || "",
          updated_at: playlistData?.updated_at || "",
          total_songs: playlistData?.total_songs || 0,
        },
        isLoading: false,
      });
      return playlistData?.songs;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },

  createPlaylistSong: async (playlistId: string, songId: string) => {
    set({ isLoading: true, error: null });
    try {
      const data = await playlistSongService.createPlaylistSong({
        playlist_id: playlistId,
        song_id: songId,
      });
      set({ isLoading: false });
      return data;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },

  deletePlaylistSongById: async (playlistId: string, songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await playlistSongService.deletePlaylistSongById(playlistId, songId);
      set({ isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));
