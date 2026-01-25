import { albumService } from "../service/albumService";
import type { Album } from "../types/album.types";
import { create } from "zustand";

interface AlbumState {
  album: Album;
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  getAllAlbumByArtistId: (artistId: string) => Promise<Album[] | undefined>;
}

export const useAlbumStore = create<AlbumState>((set) => ({
  album: {} as Album,
  albums: [],
  isLoading: false,
  error: null,
  getAllAlbumByArtistId: async (artistId: string) => {
    set({ isLoading: true, error: null });

    try {
      const data = await albumService.getAlbumByArtistId(artistId);
      console.log("album data: ", data.albumByArtistId[0]);
      set({ albums: data.albumByArtistId[0] || [], isLoading: false });
      return data;
    } catch (err) {
      set({ isLoading: false, error: (err as Error).message });
    }
  },
}));
