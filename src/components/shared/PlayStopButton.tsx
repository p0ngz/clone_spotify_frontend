interface PlayStopButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayStopButton = ({ isPlaying, onToggle }: PlayStopButtonProps) => {
  return (
    <button
      onClick={onToggle}
      style={{
        backgroundColor: isPlaying ? "transparent" : "#1db954",
        color: isPlaying ? "#ffffff" : "#000000",
        border: isPlaying ? "1px solid rgba(255,255,255,0.3)" : "none",
      }}
      className="h-10 w-32 text-md lg:text-lg font-semibold text-white rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-105"
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};

export default PlayStopButton;
