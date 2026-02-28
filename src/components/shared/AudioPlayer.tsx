import { useState, useEffect, useRef, useCallback } from "react";
import { IconButton, Slider } from "@mui/material";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { useAudioPlayerStore } from "../../store/useAudioPlayerStore";
import type { Song } from "../../types/song.types";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const isSeekingRef = useRef(false);

  const {
    currentSong,
    isPlaying,
    isLoop,
    isRandom,
    previous,
    next,
    pause,
    resume,
    toggleLoop,
    toggleRandom,
    volume,
    volumeLevelHandler,
  } = useAudioPlayerStore();

  const formatTime = (seconds: number) => {
    if (!seconds || Number.isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleOffHandler = () => {
    volumeLevelHandler(0);
  };

  // Sync ref กับ state
  useEffect(() => {
    isSeekingRef.current = isSeeking;
  }, [isSeeking]);

  // Trigger slide-up animation
  useEffect(() => {
    if (currentSong) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [currentSong]);

  // Load and play song
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.audio_url;
    audioRef.current.load();
    audioRef.current.play().catch(console.error);
    setProgress(0);
    setDuration(0);
  }, [currentSong]);

  // Play/Pause control
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Volume control
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = (volume ?? 80) / 100;
  }, [volume]);

  // Listen timeupdate — depend on currentSong so it re-binds when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const onTime = () => {
      if (!isSeekingRef.current) {
        setProgress(audio.currentTime || 0);
      }
    };
    const onMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
    };
  }, [currentSong]);

  const handlePlayPauseClick = () => {
    if (!currentSong) return;
    if (isPlaying) pause();
    else resume();
  };

  const handleSeek = useCallback((_event: Event, value: number | number[]) => {
    const nextTime = Array.isArray(value) ? value[0] : value;
    setProgress(nextTime);
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
  }, []);

  const handleVolume = (_: Event, value: number | number[]) => {
    const lvl = Array.isArray(value) ? value[0] : value;
    volumeLevelHandler(lvl);
  };

  const songInfo: Song | null = currentSong;
  const cover =
    songInfo?.cover_image_url ||
    "https://via.placeholder.com/64x64?text=No+Cover";
  const title = songInfo?.title || "No song";
  const artist = (songInfo as any)?.artist_name || "";
  const totalSeconds = duration || songInfo?.duration || 0;

  return (
    <>
      {currentSong && (
        <div
          id="audio-player"
          className={`
            fixed bottom-0 left-0 right-0
            bg-black opacity-75 px-4 py-3 flex items-center gap-4
            transition-all duration-1000 ease-in-out
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
        >
          <audio ref={audioRef} onEnded={next} preload="auto" />

          <div className="flex items-center gap-3 min-w-45 w-[30%]">
            <div id="cover-img-song" className="w-14 h-14 rounded shrink-0">
              <img
                src={cover}
                alt={title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div id="song-detail" className="flex flex-col min-w-0">
              <h1 className="text-white text-sm font-normal truncate">
                {title}
              </h1>
              <span className="text-gray-400 text-xs truncate">{artist}</span>
            </div>
            <IconButton size="small" className="ml-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
              </svg>
            </IconButton>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center max-w-[722px]">
            {/* Control Buttons */}
            <div className="flex items-center gap-2 mb-2">
              <IconButton
                size="small"
                onClick={toggleRandom}
                sx={{ color: isRandom ? "#1db954" : "rgba(255,255,255,0.7)" }}
              >
                <ShuffleOutlinedIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                onClick={previous}
                sx={{ color: "white" }}
              >
                <SkipPreviousIcon />
              </IconButton>

              <IconButton
                onClick={handlePlayPauseClick}
                sx={{
                  bgcolor: "white",
                  width: 32,
                  height: 32,
                  "&:hover": { bgcolor: "white", transform: "scale(1.06)" },
                }}
              >
                {isPlaying ? (
                  <PauseIcon sx={{ color: "black" }} />
                ) : (
                  <PlayArrowIcon sx={{ color: "black" }} />
                )}
              </IconButton>

              <IconButton size="small" onClick={next} sx={{ color: "white" }}>
                <SkipNextIcon />
              </IconButton>

              <IconButton
                size="small"
                onClick={toggleLoop}
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
                min={0}
                max={Math.max(totalSeconds, 1)}
                onMouseDown={() => setIsSeeking(true)}
                onMouseUp={() => setIsSeeking(false)}
                onChange={handleSeek}
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
                  "& .MuiSlider-track": { border: "none" },
                  "& .MuiSlider-rail": {
                    opacity: 0.3,
                    backgroundColor: "#bfbfbf",
                  },
                }}
              />
              <span className="text-xs text-gray-400 min-w-[40px]">
                {formatTime(totalSeconds)}
              </span>
            </div>
          </div>

          {/* Right: Volume & Additional Controls */}
          <div className="flex items-center gap-3 min-w-[180px] w-[30%] justify-end">
            <div className="flex items-center gap-2 w-32">
              <VolumeUpOutlinedIcon
                fontSize="small"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
                onClick={() => toggleOffHandler()}
              />
              <Slider
                value={volume ?? 80}
                onChange={handleVolume}
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
                  "& .MuiSlider-track": { border: "none" },
                  "& .MuiSlider-rail": {
                    opacity: 0.3,
                    backgroundColor: "#bfbfbf",
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;