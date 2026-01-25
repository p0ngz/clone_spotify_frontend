import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import type { PlaylistSong } from "../../types/playlistSong.types";
import { format } from "date-fns";
import { usePlaylistSongStore } from "../../store/usePlaylistSongStore";

interface PlaylistSongTableProps {
  songs?: PlaylistSong[];
  playlistId?: string;
  sendImageBackground?: (imgUrl: string) => void;
}

const PlaylistSongTable = ({
  songs = [],
  playlistId = "",
  sendImageBackground,
}: PlaylistSongTableProps) => {
  const { deletePlaylistSongById } = usePlaylistSongStore();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const displaySongs = songs && songs.length > 0 ? songs : [];

  const handlePlayPause = (id: string) => {
    setPlayingId(playingId === id ? null : id);
    const imgUrl =
      displaySongs.find((song) => song._id === id)?.cover_image_url || "";
    sendImageBackground?.(imgUrl);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  const removeSongFromPlaylist = async (songId: string) => {
    if (!playlistId) {
      console.error("Playlist ID is required to remove a song");
      return;
    }
    try {
      await deletePlaylistSongById(playlistId, songId);
      console.log(`Song ${songId} removed from playlist ${playlistId}`);
    } catch (err) {
      console.error("Error removing song from playlist:", err);
    }
  };
  useEffect(() => {
    console.log("songs: ", songs);
  }, [songs]);
  return (
    <div id="playlist-song-table" className="w-full h-full">
      <TableContainer sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="playlist song table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  width: "100px",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  width: "60px",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                TITLE
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Artist
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                Album
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                <DateRangeOutlinedIcon />
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                <AccessTimeOutlinedIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displaySongs.map((song) => (
              <TableRow
                key={song._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center justify-center">
                    <button
                      className="text-white/70 hover:text-white transition p-1 hover:cursor-pointer"
                      onClick={() => removeSongFromPlaylist(song.song_id)}
                    >
                      <RemoveIcon fontSize="small" />
                    </button>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                    padding: "8px 16px",
                  }}
                >
                  <div className="relative w-12 h-12 group">
                    <img
                      src={song.cover_image_url}
                      alt={song.song_title}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                      <button
                        onClick={() => handlePlayPause(song._id)}
                        className="text-white hover:scale-110 transition"
                      >
                        {playingId === song._id ? (
                          <PauseOutlinedIcon fontSize="medium" />
                        ) : (
                          <PlayArrowOutlinedIcon fontSize="medium" />
                        )}
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {song.song_title}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {song.artist_name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {song.album_title ? song.album_title : "-"}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {format(new Date(song.added_at), "MMM dd, yyyy")}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {formatDuration(song.duration)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlaylistSongTable;
