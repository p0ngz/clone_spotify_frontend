import { useState } from "react";
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
import { format } from "date-fns";
import AddToPlaylistDialog from "../dialogs/AddToPlaylistDialog";

interface TableListSongProps {
  songs?: Song[];
  artistName?: string | null;
  sendImageBackground?: (imgUrl: string) => void;
  isPlaylistPage: boolean;
}

const TableListSong = ({
  songs,
  artistName,
  sendImageBackground,
  isPlaylistPage = false,
}: TableListSongProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const displaySongs = songs && songs.length > 0 ? songs : [];

  const handlePlayPause = (id: string) => {
    console.log("displaySongs: ", displaySongs)
    setPlayingId(playingId === id ? null : id);
    const imgUrl =
      displaySongs.find((song: Song) => song._id === id)?.cover_image_url || "";
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
            {songs &&
              songs?.map((song) => (
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
                        onClick={() => {
                          setSelectedSong(song);
                          setDialogOpen(true);
                        }}
                        className="text-white/70 hover:text-white transition p-1 hover:cursor-pointer"
                      >
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
                    {song.artist_name ? song.artist_name : artistName}
                  </TableCell>
                  <TableCell
                    align="center"
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

      {selectedSong && (
        <AddToPlaylistDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedSong(null);
          }}
          songId={selectedSong._id}
          songTitle={selectedSong.title}
        />
      )}
    </div>
  );
};

export default TableListSong;
