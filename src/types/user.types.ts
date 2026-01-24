export interface User {
  _id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  avatar_public_id: string;
  createdAt: Date;
  isDeleted?: boolean;
  updatedAt?: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  display_name: string;
  display_img: File;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  display_name?: string;
  display_img?: File;
  avatar_public_id: string;
}