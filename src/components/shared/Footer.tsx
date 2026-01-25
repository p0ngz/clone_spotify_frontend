import AudioPlayer from "./AudioPlayer";
import { useState } from "react";
const Footer = () => {
  const [currentSong] = useState({
    id: 1,
    title: "Mrs. GREEN APPLE.",
    artist: "Mrs. GREEN APPLE",
    album: "ANTENNA",
    date: "2023-07-12",
    duration: "5:07",
    image: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
  });
  const [stateSong, setStateSong] = useState<"playing" | "paused">("playing");
  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  return (
    <div
      id="footer"
      className="bg-transparent w-full h-auto  flex items-center justify-center"
    >
      <AudioPlayer
        song={currentSong}
        stateSong={stateSong}
        isLoop={isLoop}
        isShuffle={isShuffle}
        onPlayPause={() =>
          setStateSong(stateSong === "playing" ? "paused" : "playing")
        }
        onLoopToggle={() => setIsLoop(!isLoop)}
        onShuffleToggle={() => setIsShuffle(!isShuffle)}
      />
    </div>
  );
};

export default Footer;
