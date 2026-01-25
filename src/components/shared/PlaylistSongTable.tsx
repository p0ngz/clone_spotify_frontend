import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import type { PlaylistSong } from "../../types/playlistSong.types";
import type { Song } from "../../types/song.types";
import { format } from "date-fns";
import { usePlaylistSongStore } from "../../store/usePlaylistSongStore";
import { useAudioPlayerStore } from "../../store/useAudioPlayerStore";

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
  const { setQueueAndPlay, pause, isPlaying, currentSong } =
    useAudioPlayerStore();
  const [filterText, setFilterText] = useState("");

  const displaySongs = songs && songs.length > 0 ? songs : [];

  const filteredSongs = displaySongs.filter((song) => {
    const searchTerm = filterText.toLowerCase();
    const title = song.song_title?.toLowerCase() || "";
    const artist = song.artist_name?.toLowerCase() || "";
    const album = song.album_title?.toLowerCase() || "";

    return (
      title.includes(searchTerm) ||
      artist.includes(searchTerm) ||
      album.includes(searchTerm)
    );
  });

  const mapToSong = (ps: PlaylistSong): Song => ({
    _id: ps.song_id || ps._id,
    title: ps.song_title,
    artist_id: ps.artist_id,
    album_id: ps.album_id || "",
    audio_url: ps.audio_url,
    audio_public_id: "",
    duration: ps.duration,
    cover_image_url: ps.cover_image_url,
    cover_public_id: "",
    lyric: "",
    genre: ps.genre || [],
    release_date: ps.added_at,
    isDeleted: ps.isDeleted,
  });

  const handlePlayPause = (song: PlaylistSong) => {
    console.log("filteredSongs: ", filteredSongs)
    const queue = filteredSongs.map(mapToSong);
    console.log("queue: ", queue);
    const isCurrent = currentSong?._id === (song.song_id || song._id);

    if (isCurrent && isPlaying) {
      pause();
      return;
    }

    setQueueAndPlay(mapToSong(song), queue);

    const imgUrl = song.cover_image_url || "";
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

  return (
    <div id="playlist-song-table" className="w-full h-full">
      <div className="mt-5">
        <TextField
          placeholder="Filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          size="small"
          sx={{
            width: "250px",
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#ffffff",
              fontSize: "0.875rem",
              borderRadius: "4px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255,255,255,0.5)",
              opacity: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>

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
            {filteredSongs.map((song) => {
              const isRowPlaying =
                (currentSong?._id === song.song_id ||
                  currentSong?._id === song._id) &&
                isPlaying;

              return (
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
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center group">
                        <button
                          onClick={() => handlePlayPause(song)}
                          className="text-white cursor-pointer hover:scale-110 transition  "
                        >
                          {isRowPlaying ? (
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlaylistSongTable;
