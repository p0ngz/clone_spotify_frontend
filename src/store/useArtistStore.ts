import { artistService } from "../service/artistService";
import { create } from "zustand";
import type { Artist } from "../types/artist.types";

interface ArtistState {
  artists: Artist[];
  artist: Artist | null;
  getAllArtists: () => Promise<Artist[] | undefined>;
  getArtistById: (id: string) => Promise<Artist | undefined>;
  isLoading: boolean;
  error: string | null;
}

export const useArtistStore = create<ArtistState>((set) => ({
  artists: [],
  artist: null,
  isLoading: false,
  error: null,
  getAllArtists: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await artistService.getAllArtist();
      set({ artists: response?.artists || [], isLoading: false });
      return response?.artists;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
  getArtistById: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const artist = await artistService.getArtistById(id);
      set({ artist: artist || null, isLoading: false });
      return artist;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
}));
