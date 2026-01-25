import { axiosInstance } from "../config/axios";
import type {
  Album,
  CreateAlbumType,
  UpdateAlbumType,
} from "../types/album.types";

interface AlbumResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  albums: Album[];
}

export const albumService = {
  getAllAlbum: async () => {
    const response = await axiosInstance.get<AlbumResponse>("/albums");

    return response?.data;
  },
  getAlbumById: async (id: string) => {
    const response = await axiosInstance.get<Album>(`/albums/${id}`);
    return response?.data;
  },
  getAlbumByArtistId: async (artistId: string) => {
    const response = await axiosInstance.get(`/albums/artist/${artistId}`);
    return response.data;
  },
  createAlbum: async (data: CreateAlbumType) => {
    const response = await axiosInstance.post("/albums", data);
    return response?.data;
  },
  updateAlbumByAlbumId: async (id: string, data: UpdateAlbumType) => {
    const response = await axiosInstance.put(`/albums/${id}`, data);
    return response?.data;
  },
  deleteAlbumById: async (id: string) => {
    const response = await axiosInstance.delete(`/albums/${id}`);
    return response?.data;
  },
  hardDeleteAlbumById: async (id: string) => {
    const response = await axiosInstance.delete(`/albums/${id}/hard`);
    return response?.data;
  },
};
