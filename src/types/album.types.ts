export interface Album {
  _id: string;
  artist_id: string;
  title: string;
  description: string;
  cover_image_url: string;
  cover_public_id: string;
  release_date: Date;
  isDeleted?: boolean;
  updatedAt?: Date;
}

export interface CreateAlbumType {
  artist_id: string;
  title: string;
  description: string;
  release_date: Date;
  album_img: File;
}

export interface UpdateAlbumType {
  artist_id?: string;
  title?: string;
  description?: string;
  album_public_id?: string;
  release_date?: Date;
  album_img?: File;
}