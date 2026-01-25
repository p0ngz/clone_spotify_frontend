import { axiosInstance } from "../config/axios";
import type {
  Playlist,
  CreatePlaylistType,
  UpdatePlaylistType,
} from "../types/playlist.types";

// API response for paginated playlists
interface PlaylistResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  playlists: Playlist[];
}

export const playlistService = {
  getAllPlaylist: async () => {
    const response = await axiosInstance.get<PlaylistResponse>("/playlists");
    return response?.data;
  },
  getPlaylistById: async (id: string) => {
    const response = await axiosInstance.get<Playlist>(`/playlists/${id}`);
    return response?.data;
  },
  getPlaylistByUserId: async (userId: string) => {
    const response = await axiosInstance.get<PlaylistResponse>(
      `/playlists/user/${userId}`,
    );
    return response?.data;
  },
  createPlaylist: async (data: CreatePlaylistType) => {
    const response = await axiosInstance.post("/playlists", data);
    return response?.data;
  },
  updatePlaylistById: async (id: string, data: UpdatePlaylistType) => {
    const response = await axiosInstance.put(`/playlists/${id}`, data);
    return response?.data;
  },
  deletePlaylistById: async (id: string) => {
    const response = await axiosInstance.delete(`/playlists/${id}`);
    return response?.data;
  },
  hardDeletePlaylistById: async (id: string) => {
    const response = await axiosInstance.delete(`/playlists/${id}/hard`);
    return response?.data;
  },
};
