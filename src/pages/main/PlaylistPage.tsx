import { useEffect } from "react";
import PlaylistDetail from "../../components/PlaylistDetail";
import PlaylistSongTable from "../../components/shared/PlaylistSongTable";
import { useParams } from "react-router-dom";
import { usePlaylistSongStore } from "../../store/usePlaylistSongStore";

const PlaylistPage = () => {
  const params = useParams();
  const playlistId = params?.playlistId || "";
  const { playlistSongs, playlistMetadata, getPlaylistSongByPlaylistId } =
    usePlaylistSongStore();

  const totalDuration =
    playlistSongs && playlistSongs.length > 0
      ? Math.round(
          playlistSongs.reduce(
            (total, song) => total + (song.duration || 0),
            0,
          ) / 60,
        )
      : 0;

  const coverImage =
    playlistMetadata?.playlist_cover_image ||
    (playlistSongs && playlistSongs.length > 0
      ? playlistSongs.slice(0, 4).map((song) => song.cover_image_url)
      : "");

  useEffect(() => {
    const fetchData = async (playlistId: string) => {
      if (playlistId) {
        await getPlaylistSongByPlaylistId(playlistId);
      }
    };

    fetchData(playlistId);
  }, [playlistId, getPlaylistSongByPlaylistId]);
  useEffect(() => {
  }, [playlistMetadata]);
  return (
    <div id="playlist-page" className="w-full">
      <div id="playlist-detail-container" className="w-full h-64">
        {playlistMetadata && (
          <PlaylistDetail
            playlistId={playlistId}
            title={playlistMetadata?.playlist_name}
            description={playlistMetadata?.playlist_description}
            coverImage={coverImage}
            public_url={playlistMetadata?.playlist_cover_public_id || null}
            createdBy="You"
            totalSong={playlistMetadata?.total_songs}
            totalDuration={totalDuration}
          />
        )}
      </div>
      <div id="playlist-table" className="w-full">
        {playlistSongs && playlistSongs.length > 0 && (
          <PlaylistSongTable songs={playlistSongs} playlistId={playlistId} />
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
