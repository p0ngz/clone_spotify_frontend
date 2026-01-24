import { axiosInstance } from "../config/axios";
import type {
  PlaylistSong,
  CreatePlaylistSongType,
  UpdatePlaylistSongType,
} from "../types/playlistSong.types";

export const playlistSongService = {
  getAllPlaylistSongs: async () => {
    const response = await axiosInstance.get<PlaylistSong[]>("/playlistSongs");
    return response?.data;
  },
  getPlaylistSongById: async (id: string) => {
    const response = await axiosInstance.get<PlaylistSong>(
      `/playlistSongs/${id}`,
    );
    return response?.data;
  },
  getPlaylistSongByPlaylistId: async (playlistId: string) => {
    const response = await axiosInstance.get(
      `/playlistSongs/playlist/${playlistId}`,
    );
    return response?.data;
  },
  getPlaylistBySongId: async (songId: string) => {
    const response = await axiosInstance.get(`/playlistSongs/song/${songId}`);
    return response?.data;
  },
  //   add song to playlist
  createPlaylistSong: async (data: CreatePlaylistSongType) => {
    const response = await axiosInstance.post("/playlistSongs", data);
    return response?.data;
  },
  updatePlaylistSongById: async (id: string, data: UpdatePlaylistSongType) => {
    const response = await axiosInstance.put(`/playlistSongs/${id}`, data);
    return response?.data;
  },
  deletePlaylistSongById: async (id: string) => {
    const response = await axiosInstance.delete(`/playlistSongs/${id}`);
    return response?.data;
  },
  hardDeletePlaylistById: async (id: string) => {
    const response = await axiosInstance.delete(`/playlistSongs/${id}/hard`);
    return response?.data;
  },
};
