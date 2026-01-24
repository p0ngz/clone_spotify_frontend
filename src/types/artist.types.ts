export interface Artist {
  _id: string;
  name: string;
  genre: string;
  image_url: string;
  image_public_id: string;
  description: string;
  createdAt: Date;
  isDeleted?: boolean;
  updatedAt?: Date;
}

export interface CreateArtistType {
  name: string;
  genre: string;
  description: string;
  artist_img: File;
}

export interface UpdateArtistType {
  name?: string;
  genre?: string;
  description?: string;
  artist_img_public_id?: string;
  artist_img?: File;
}
