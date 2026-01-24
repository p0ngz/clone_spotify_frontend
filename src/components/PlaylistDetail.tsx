import { useState, useMemo } from "react";
import PlayStopButton from "./shared/PlayStopButton";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import MenuPopup from "./shared/MenuPopup";
import { type MenuOption } from "./shared/MenuPopup";

interface PlaylistDetailProps {
  playlistId: number;
  title: string;
  description: string;
  coverImage: string | string[]; //if no cover image will be an array of strings of 1-3 cover image of song
  createdBy: string;
  createdAt?: string;
  totalSong: number;
  totalDuration: number;
}

const menuData: MenuOption[] = [
  {
    id: "radio",
    label: "Go to Playlist Radio",
    onClick: () => console.log("Go to Playlist Radio"),
  },
  {
    id: "collaborative",
    label: "Collaborative Playlist",
    onClick: () => console.log("Collaborative Playlist toggled"),
  },
  {
    id: "make-secret",
    label: "Make Secret",
    onClick: () => console.log("Make Secret toggled"),
    divider: true,
  },
  {
    id: "edit",
    label: "Edit Details",
    onClick: () => console.log("Edit Details"),
  },
  {
    id: "delete",
    label: "Delete",
    onClick: () => console.log("Delete playlist"),
    divider: true,
  },
  {
    id: "create-similar",
    label: "Create Similar Playlist",
    onClick: () => console.log("Create Similar Playlist"),
  },
  {
    id: "download",
    label: "Download",
    onClick: () => console.log("Download playlist"),
  },
  {
    id: "share",
    label: "Share",
    onClick: () => console.log("Share playlist"),
  },
];
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
  const [isPlaying, setIsPlaying] = useState(false);

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
      <div id="playlist-img" className="w-auto h-full p-0 flex-none">
        {Array.isArray(coverImage) ? (
          <>
            <div id="row-1" className="flex">
              <img
                src={coverImage[0]}
                alt="playlist-cover-1"
                className="w-1/2 h-32 object-cover"
              />
              <img
                src={coverImage[1]}
                alt="playlist-cover-2"
                className="w-1/2 h-32 object-cover"
              />
            </div>
            <div id="row-2" className="flex">
              <img
                src={coverImage[2]}
                alt="playlist-cover-2"
                className="w-1/2 h-32 object-cover"
              />
              <img
                src={coverImage[3]}
                alt="playlist-cover-3"
                className="w-1/2 h-32 object-cover"
              />
            </div>
          </>
        ) : (
          <>
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover "
            />
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
