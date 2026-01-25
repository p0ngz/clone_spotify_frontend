import { axiosInstance } from "../config/axios";
import type {
  Artist,
  CreateArtistType,
  UpdateArtistType,
} from "../types/artist.types";

interface ArtistResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  artists: Artist[];
}

export const artistService = {
  getAllArtist: async () => {
    const response = await axiosInstance.get<ArtistResponse>("/artists");
    return response?.data;
  },
  getArtistById: async (id: string) => {
    const response = await axiosInstance.get<Artist>(`/artists/${id}`);
    return response?.data;
  },
  createArtist: async (data: CreateArtistType) => {
    const response = await axiosInstance.post("/artists", data);
    return response?.data;
  },
  updateArtistById: async (id: string, data: UpdateArtistType) => {
    const response = await axiosInstance.put(`/artists/${id}`, data);
    return response?.data;
  },
  deleteArtistById: async (id: string) => {
    const response = await axiosInstance.delete(`/artists/${id}`);
    return response?.data;
  },
  hardDeleteArtistById: async (id: string) => {
    const response = await axiosInstance.delete(`/artists/${id}/hard`);
    return response?.data;
  },
};
