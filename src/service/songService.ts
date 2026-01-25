import { axiosInstance } from "../config/axios";
import type { Song, CreateSongType, UpdateSongType } from "../types/song.types";

interface SongResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  songs: Song[];
}

interface SongByArtistResponse {
  songByArtistId: {
    _id: string;
    artist: {
      _id: string;
      name: string;
      genre: string[];
      image_url: string;
      image_public_id: string;
      description: string;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
      __v?: number;
    };
    songs: Song[];
  }[];
}

export const songService = {
  getAllSongs: async () => {
    const response = await axiosInstance.get<SongResponse>("/songs");
    return response?.data;
  },
  getSongById: async (id: string) => {
    const response = await axiosInstance.get<Song>(`/songs/${id}`);
    return response?.data;
  },
  getSongByArtistId: async (artistId: string) => {
    const response = await axiosInstance.get<SongByArtistResponse>(
      `/songs/artist/${artistId}`,
    );
    return response.data;
  },
  getSongByAlbumId: async (albumId: string) => {
    const response = await axiosInstance.get(`/songs/album/${albumId}`);
    return response.data;
  },
  createSong: async (data: CreateSongType) => {
    const response = await axiosInstance.post("/songs", data);
    return response?.data;
  },
  updateSongById: async (id: string, data: UpdateSongType) => {
    const response = await axiosInstance.put(`/songs/${id}`, data);
    return response?.data;
  },
  deleteSongById: async (id: string) => {
    const response = await axiosInstance.delete(`/songs/${id}`);
    return response?.data;
  },
  hardDeleteSongById: async (id: string) => {
    const response = await axiosInstance.delete(`/songs/${id}/hard`);
    return response?.data;
  },
};
