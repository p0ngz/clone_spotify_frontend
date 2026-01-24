export interface Song {
  _id: string;
  title: string;
  artist_id: string;
  album_id: string;
  audio_url: string;
  audio_public_id: string;
  duration: number; //seconds
  cover_image_url: string;
  cover_public_id: string;
  lyric?: string;
  genre: string[];
  release_date: string;
  isDeleted?: boolean;
  updatedAt?: string;
}

export interface CreateSongType {
  title: string;
  artist_id: string;
  album_id?: string;
  lyric?: string;
  genre: string[];
  release_date: string;
  cover_image: File;
  audio_file: File;
}

export interface UpdateSongType {
  title?: string;
  artist_id?: string;
  album_id?: string;
  audio_public_id?: string;
  audio_file?: File;
  cover_public_id?: string;
  cover_image?: File;
  lyric?: string;
  genre?: string[];
  release_date?: Date;
}