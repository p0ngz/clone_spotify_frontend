export interface PlaylistSong {
  _id: string;
  song_id: string;
  order?: number;
  added_at: string;
  song_title: string;
  audio_url: string;
  cover_image_url: string;
  duration: number;
  artist_id: string;
  genre: string[];
  createdAt?: string;
  isDeleted?: boolean;
}

// Legacy minimal type for other uses
export interface PlaylistSongMinimal {
  _id: string;
  playlist_id: string;
  song_id: string;
  order?: number;
  added_at: Date;
  createdAt: Date;
  isDeleted?: boolean;
}

export interface CreatePlaylistSongType {
  playlist_id: string;
  song_id: string;
  order?: number;
}
export interface UpdatePlaylistSongType {
  order: number;
}
export interface UpdatePlaylistSongType {
  order: number;
}