import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import type { Song } from "../../types/song.types";
import { useAlbumStore } from "../../store/useAlbumStore";
import { format } from "date-fns";

interface TableListSongProps {
  songs?: Song[];
  artistName?: string | null;
  sendImageBackground?: (imgUrl: string) => void;
  isPlaylistPage: boolean;
}

// Mock data
const mockSongs: Song[] = [
  {
    _id: "1",
    title: "Shut Up and Dance",
    artist_id: "artist1",
    album_id: "album1",
    audio_url: "",
    audio_public_id: "",
    duration: 198,
    cover_image_url:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["pop"],
    release_date: "2016-08-09",
  },
  {
    _id: "2",
    title: "Cheap Thrills",
    artist_id: "artist2",
    album_id: "album2",
    audio_url: "",
    audio_public_id: "",
    duration: 211,
    cover_image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["pop"],
    release_date: "2016-08-09",
  },
  {
    _id: "3",
    title: "Pump Up the Kicks",
    artist_id: "artist3",
    album_id: "album3",
    audio_url: "",
    audio_public_id: "",
    duration: 240,
    cover_image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["pop"],
    release_date: "2016-08-09",
  },
  {
    _id: "4",
    title: "Take a Walk",
    artist_id: "artist4",
    album_id: "album4",
    audio_url: "",
    audio_public_id: "",
    duration: 264,
    cover_image_url:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["pop"],
    release_date: "2016-08-09",
  },
  {
    _id: "5",
    title: "Work This Body",
    artist_id: "artist1",
    album_id: "album1",
    audio_url: "",
    audio_public_id: "",
    duration: 236,
    cover_image_url:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["pop"],
    release_date: "2016-08-09",
  },
  {
    _id: "6",
    title: "Radioactive",
    artist_id: "artist5",
    album_id: "album5",
    audio_url: "",
    audio_public_id: "",
    duration: 187,
    cover_image_url:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["rock"],
    release_date: "2016-08-09",
  },
  {
    _id: "7",
    title: "Everybody Talks",
    artist_id: "artist6",
    album_id: "album6",
    audio_url: "",
    audio_public_id: "",
    duration: 177,
    cover_image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["indie"],
    release_date: "2016-08-09",
  },
  {
    _id: "8",
    title: "Little Talks",
    artist_id: "artist7",
    album_id: "album7",
    audio_url: "",
    audio_public_id: "",
    duration: 267,
    cover_image_url:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=100&h=100&fit=crop",
    cover_public_id: "",
    genre: ["indie"],
    release_date: "2016-08-09",
  },
];

const TableListSong = ({
  songs = mockSongs,
  artistName,
  sendImageBackground,
  isPlaylistPage = false,
}: TableListSongProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { albums } = useAlbumStore();
  const displaySongs = songs && songs.length > 0 ? songs : mockSongs;

  const getAlbumName = (albumId: string): string => {
    const album = albums?.albums.find((a) => a._id === albumId);
    return album?.title || "—";
  };

  const handlePlayPause = (id: string) => {
    setPlayingId(playingId === id ? null : id);
    const imgUrl =
      displaySongs.find((song) => song._id === id)?.cover_image_url || "";
    sendImageBackground?.(imgUrl);
  };

  return (
    <div id="table-list-song" className="w-full h-full">
      <TableContainer sx={{ backgroundColor: "transparent" }}>
        <Table sx={{ minWidth: 650 }} aria-label="song table">
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
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                ALBUM
              </TableCell>
              <TableCell
                align={isPlaylistPage ? "center" : "center"}
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {isPlaylistPage ? <DateRangeOutlinedIcon /> : "DATE"}
              </TableCell>
              {isPlaylistPage && (
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
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {displaySongs.map((song) => (
              <TableRow
                key={song._id}
                onMouseEnter={() => setHoveredRow(song._id)}
                onMouseLeave={() => setHoveredRow(null)}
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
                    <button className="text-white/70 hover:text-white transition p-1">
                      <AddRoundedIcon fontSize="small" />
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
                      alt={song.title}
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
                  {song.title}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {artistName || "Unknown"}
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {getAlbumName(song.album_id)}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {format(
                    song.release_date
                      ? new Date(song.release_date)
                      : new Date(),
                    "MMM dd, yyyy",
                  )}
                </TableCell>
                {isPlaylistPage && (
                  <TableCell
                    align="left"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {Math.floor(song.duration / 60)}:
                    {String(song.duration % 60).padStart(2, "0")}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableListSong;
