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

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
  image: string;
}

interface TableListSongProps {
  songs?: Song[];
  sendImageBackground?: (imgUrl: string) => void;
  isPlaylistPage: boolean;
}

// Mock data
const mockSongs: Song[] = [
  {
    id: 1,
    title: "Shut Up and Dance",
    artist: "Walk the Moon",
    album: "TALKING IS HARD",
    date: "2016-08-09",
    duration: "3:18",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Cheap Thrills",
    artist: "Sia",
    album: "Young the Giant Special Edit",
    date: "2016-08-09",
    duration: "3:31",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Pump Up the Kicks",
    artist: "Foster the People",
    album: "Torches",
    date: "2016-08-09",
    duration: "4:00",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "Take a Walk",
    artist: "Passion Pit",
    album: "Gossamer",
    date: "2016-08-09",
    duration: "4:24",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    title: "Work This Body",
    artist: "Walk the Moon",
    album: "TALKING IS HARD",
    date: "2016-08-09",
    duration: "3:56",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    title: "Radioactive",
    artist: "Imagine Dragons",
    album: "Night Visions",
    date: "2016-08-09",
    duration: "3:07",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
  },
  {
    id: 7,
    title: "Everybody Talks",
    artist: "Neon Trees",
    album: "Pictures (Show Deluxe Edition)",
    date: "2016-08-09",
    duration: "2:57",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop",
  },
  {
    id: 8,
    title: "Little Talks",
    artist: "Of Monsters and Men",
    album: "My Head Is An Animal",
    date: "2016-08-09",
    duration: "4:27",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=100&h=100&fit=crop",
  },
];

const TableListSong = ({
  songs = mockSongs,
  sendImageBackground,
  isPlaylistPage = false,
}: TableListSongProps) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handlePlayPause = (id: number) => {
    setPlayingId(playingId === id ? null : id);
    const imgUrl = mockSongs.find((song) => song.id === id)?.image || "";
    sendImageBackground?.(imgUrl);
  };
  useEffect(() => {
    console.log(hoveredRow);
  }, [hoveredRow]);
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
                  Artist
                </TableCell>
              )}
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
            {songs.map((song) => (
              <TableRow
                key={song.id}
                onMouseEnter={() => setHoveredRow(song.id)}
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
                      src={song.image}
                      alt={song.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                      <button
                        onClick={() => handlePlayPause(song.id)}
                        className="text-white hover:scale-110 transition"
                      >
                        {playingId === song.id ? (
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
                    {song.artist}
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {song.album}
                </TableCell>
                <TableCell
                  align={isPlaylistPage ? "center" : "center"}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.875rem",
                  }}
                >
                  {song.date}
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
                    {song.duration}
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
