import { useState } from "react";
import { IconButton, Slider } from "@mui/material";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import PictureInPictureAltOutlinedIcon from "@mui/icons-material/PictureInPictureAltOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
  image: string;
}

interface AudioPlayerProps {
  song: Song;
  stateSong: "playing" | "paused";
  isLoop: boolean;
  isShuffle: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onPlayPause?: () => void;
  onLoopToggle?: () => void;
  onShuffleToggle?: () => void;
}

const AudioPlayer = ({
  song,
  stateSong,
  isLoop,
  isShuffle,
  onPrevious,
  onNext,
  onPlayPause,
  onLoopToggle,
  onShuffleToggle,
}: AudioPlayerProps) => {
  const [progress, setProgress] = useState(67); // 1:07 out of 5:07
  const [volume, setVolume] = useState(70);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      id="audio-player"
      className="fixed bottom-0 left-0 right-0 bg-black mt-5  px-4 py-3 flex items-center gap-4"
    >
      {/* Left: Album Art & Song Info */}
      <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
        <div id="cover-img-song" className="w-14 h-14 rounded flex-shrink-0">
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div id="song-detail" className="flex flex-col min-w-0">
          <h1 className="text-white text-sm font-normal truncate">{song.title}</h1>
          <span className="text-gray-400 text-xs truncate">{song.artist}</span>
        </div>
        {/* <IconButton size="small" className="ml-2">
          <svg
            className="w-4 h-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
          </svg>
        </IconButton> */}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-[722px]">
        {/* Control Buttons */}
        <div className="flex items-center gap-2 mb-2">
          <IconButton
            size="small"
            onClick={onShuffleToggle}
            sx={{ color: isShuffle ? "#1db954" : "rgba(255,255,255,0.7)" }}
          >
            <ShuffleOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={onPrevious} sx={{ color: "white" }}>
            <SkipPreviousIcon />
          </IconButton>

          <IconButton
            onClick={onPlayPause}
            sx={{
              bgcolor: "white",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "white", transform: "scale(1.06)" },
            }}
          >
            {stateSong === "playing" ? (
              <PauseIcon sx={{ color: "black" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "black" }} />
            )}
          </IconButton>

          <IconButton size="small" onClick={onNext} sx={{ color: "white" }}>
            <SkipNextIcon />
          </IconButton>

          <IconButton
            size="small"
            onClick={onLoopToggle}
            sx={{ color: isLoop ? "#1db954" : "rgba(255,255,255,0.7)" }}
          >
            <RepeatOutlinedIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">
            {formatTime(progress)}
          </span>
          <Slider
            value={progress}
            onChange={(_, value) => setProgress(value as number)}
            max={307} // 5:07 in seconds
            sx={{
              color: "white",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0px 0px 0px 8px rgba(255, 255, 255, 0.16)",
                },
              },
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-rail": {
                opacity: 0.3,
                backgroundColor: "#bfbfbf",
              },
            }}
          />
          <span className="text-xs text-gray-400 min-w-[40px]">
            {song.duration}
          </span>
        </div>
      </div>

      {/* Right: Volume & Additional Controls */}
      <div className="flex items-center gap-3 min-w-[180px] w-[30%] justify-end">
        <IconButton size="small" sx={{ color: "rgba(255,255,255,0.7)" }}>
          <PictureInPictureAltOutlinedIcon fontSize="small" />
        </IconButton>

        <div className="flex items-center gap-2 w-32">
          <VolumeUpOutlinedIcon
            fontSize="small"
            sx={{ color: "rgba(255,255,255,0.7)" }}
          />
          <Slider
            value={volume}
            onChange={(_, value) => setVolume(value as number)}
            sx={{
              color: "white",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0px 0px 0px 8px rgba(255, 255, 255, 0.16)",
                },
              },
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-rail": {
                opacity: 0.3,
                backgroundColor: "#bfbfbf",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
