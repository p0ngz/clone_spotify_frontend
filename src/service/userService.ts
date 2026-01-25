import { axiosInstance } from "../config/axios";
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types/user.types";

interface UserResponse {
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  users: User[];
}

export const userService = {
  getAllUser: async () => {
    const response = await axiosInstance.get<UserResponse>("/users");
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },
  createUser: async (data: CreateUserRequest) => {
    const response = await axiosInstance.post("/users", data);
    return response.data;
  },
  updateUserById: async (id: string, data: UpdateUserRequest) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  },
  deleteUserById: async (id: string) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  },
  hardDeleteUserById: async (id: string) => {
    const response = await axiosInstance.delete(`/users/${id}/hard`);
    return response.data;
  },
};
