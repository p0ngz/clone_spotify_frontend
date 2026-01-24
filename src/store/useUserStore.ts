import { create } from "zustand";
import { userService } from "../service/userService";
import type { User } from "../types/user.types";
interface UserState {
  user: User;
  getUserById: (id: string) => Promise<User | undefined>;
  isLoading: boolean;
  error: string | null;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: {} as User,
  isLoading: false,
  error: null,
  getUserById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await userService.getUserById(id);
      set({ user, isLoading: false });
      return user;
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
      return undefined;
    }
  },
}));
