import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayStopButton from "./shared/PlayStopButton";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import MenuPopup from "./shared/MenuPopup";
import { type MenuOption } from "./shared/MenuPopup";
import { usePlaylistStore } from "../store/usePlaylistStore";

interface PlaylistDetailProps {
  playlistId: string;
  title: string;
  description: string;
  coverImage: string | string[]; //if no cover image will be an array of strings of 1-3 cover image of song
  public_url: string | null;
  createdBy: string;
  createdAt?: string;
  totalSong: number;
  totalDuration: number;
}

const PlaylistDetail = ({
  playlistId,
  title,
  description,
  coverImage,
  createdBy,
  //   createdAt,
  totalSong,
  totalDuration,
}: PlaylistDetailProps) => {
  const navigate = useNavigate();
  const { hardDeletePlaylistById: deletePlaylistFromStore } =
    usePlaylistStore();

  const [isPlaying, setIsPlaying] = useState(false);

  
  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylistFromStore(playlistId);
      console.log(`Playlist ${playlistId} deleted`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting playlist:", err);
    }
  };
  useEffect(() => {
    console.log(playlistId, title, description, coverImage);
  });
  const menuData: MenuOption[] = [
    {
      id: "edit",
      label: "Edit Playlist",
      onClick: () => console.log("Edit Details"),
    },
    {
      id: "delete",
      label: "Delete",
      onClick: handleDeletePlaylist,
      divider: true,
    },
  ];

  //   const [totalDuration, setTotalDuration] = useState<number>(0);
  const duration = useMemo(() => {
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
  }, [totalDuration]);
  return (
    <div
      id="playlist-detail-container"
      className="w-full h-full flex justify-start items-center gap-5"
      key={playlistId}
    >
      <div id="playlist-img" className="w-60 h-60 p-0 flex-none">
        {!Array.isArray(coverImage) ? (
          // case have image cover playlist
          <>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover "
            />
          </>
        ) : coverImage.length >= 1 && coverImage.length < 4 ? (
          <>
            <img
              src={coverImage[0]}
              alt="playlist-cover-1"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <>
            <div id="row-1" className="flex">
              <img
                src={coverImage[0]}
                alt="playlist-cover-1"
                className="w-1/2 h-1/2 object-cover"
              />
              <img
                src={coverImage[1]}
                alt="playlist-cover-2"
                className="w-1/2 h-1/2 object-cover"
              />
            </div>
            <div id="row-2" className="flex">
              <img
                src={coverImage[2]}
                alt="playlist-cover-2"
                className="w-1/2 h-1/2 object-cover"
              />
              <img
                src={coverImage[3]}
                alt="playlist-cover-3"
                className="w-1/2 h-1/2 object-cover"
              />
            </div>
          </>
        )}
      </div>
      <div
        id="playlist-detail"
        className="w-full h-full shrink flex flex-col justify-end gap-5 "
      >
        <div className="flex flex-col justify-end items-start">
          <h3 className="font-semibold text-sm lg:text-md  uppercase">
            PLAYLIST
          </h3>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="font-semibold text-sm lg:text-md  mt-3 mb-2 text-gray-600">
            {description}
          </p>
          <p className="font-semibold text-sm lg:text-md text-gray-600 flex items-center gap-2">
            Created by <span className="font-bold text-white">{createdBy}</span>{" "}
            <CircleIcon sx={{ width: "8px", height: "8px" }} />
            <span>
              {totalSong} songs, {duration}
            </span>
          </p>
        </div>
        <div
          id="playlist-detail-action"
          className="flex justify-start items-center gap-3"
        >
          <PlayStopButton
            isPlaying={isPlaying}
            onToggle={() => setIsPlaying(!isPlaying)}
          />
          <MenuPopup
            options={menuData}
            triggerIcon={
              <div className="w-12 h-12 grid place-content-center rounded-full cursor-pointer border border-transparent hover:border-white/20 transition group">
                <MoreHorizOutlinedIcon
                  fontSize="small"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    transition: "color 0.2s",
                    ".group:hover &": {
                      color: "rgba(255,255,255,0.5)",
                    },
                  }}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
