export interface Playlist {
  _id: string;
  user_id: string;
  name: string; //name playlist
  description: string;
  cover_image_url: string;
  cover_public_id: string;
  is_public: boolean;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreatePlaylistType {
  user_id: string;
  name: string; //name playlist
  description?: string;
  is_public?: boolean;
  playlist_img: File;
}

export interface UpdatePlaylistType {
  name?: string;
  description?: string;
  is_public?: boolean;
  cover_public_id?: string;
  playlist_img?: File;
}