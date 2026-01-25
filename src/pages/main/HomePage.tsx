import TableListSong from "../../components/TableListSong";
import { useState, useEffect } from "react";
import { useSongStore } from "../../store/useSongStore";

const HomePage = () => {
  const [bgImage, setBgImage] = useState<string>("");
  const { songs, getAllSongs, artistName } = useSongStore();

  const receiveImgUrl = (url: string) => {
    setBgImage(url);
  };

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  return (
    <div id="homepage" className="w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          opacity: bgImage ? 0.15 : 0,
          transition: "opacity 0.3s ease-in-out",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Content with dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div className="relative z-10">
        <TableListSong
          songs={songs}
          artistName={artistName}
          sendImageBackground={receiveImgUrl}
          isPlaylistPage={false}
        />
      </div>
    </div>
  );
};
export default HomePage;
