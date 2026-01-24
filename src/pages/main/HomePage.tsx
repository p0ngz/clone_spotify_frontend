import TableListSong from "../../components/shared/TableListSong";
import { useState } from "react";
const HomePage = () => {
  const [bgImage, setBgImage] = useState<string>("");
  const receiveImgUrl = (url: string) => {
    console.log("Received image URL from TableListSong:", url);
    setBgImage(url);
  };
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
          sendImageBackground={receiveImgUrl}
          isPlaylistPage={false}
        />
      </div>
    </div>
  );
};
export default HomePage;
