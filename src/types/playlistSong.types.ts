export interface PlaylistSong {
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