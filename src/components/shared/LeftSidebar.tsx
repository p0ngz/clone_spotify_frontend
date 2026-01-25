import ArtistList from "./ArtistList";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ChipCard from "./ChipCard";
import { useArtistStore } from "../../store/useArtistStore";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useSongStore } from "../../store/useSongStore";
import { useAlbumStore } from "../../store/useAlbumStore";
import { env } from "../../config/env";
type SidebarItem = {
  id: string;
  name: string;
  image: string;
  type: "artist" | "playlist";
};
const chipCardData = [
  { title: "เพลย์ลิสต์", type: "playlist" as const },
  { title: "ศิลปิน", type: "artist" as const },
];

// left sidebar component
const LeftSidebar = () => {
  const navigate = useNavigate();
  const { artists, getAllArtists, error: artistError } = useArtistStore();
  const { playlists, getPlaylistByUserId, error: playlistError } = usePlaylistStore();
  const { getSongByArtistId, setArtistName } = useSongStore();
  const { getAllAlbumByArtistId } = useAlbumStore();

  // Build sidebar menu data from store values (no local state needed)
  const menuSidebarData = useMemo<SidebarItem[]>(() => {
    const playlistItems: SidebarItem[] = (playlists || []).map((p) => ({
      id: p._id,
      name: p.name,
      image: p.cover_image_url,
      type: "playlist",
    }));
    const artistItems: SidebarItem[] = (artists || []).map((a) => ({
      id: a._id,
      name: a.name,
      image: a.image_url,
      type: "artist",
    }));


    return [...playlistItems, ...artistItems];
  }, [playlists, artists]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<
    Set<"artist" | "playlist">
  >(new Set());
  const handleTypeToggle = (type: "artist" | "playlist") => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  const filteredData =
    selectedTypes.size > 0
      ? menuSidebarData.filter((item) => selectedTypes.has(item.type))
      : menuSidebarData;

  const handleSelect = async (item: SidebarItem) => {
    if (item.type === "playlist") {
      navigate(`/playlist/${item.id}`);
      return;
    }

    // Artist click: set artist name and fetch songs + albums
    setArtistName(item.name);
    await getSongByArtistId(item.id);
    // Fetch albums for this artist to display album names in table
    await getAllAlbumByArtistId(item.id);
  };

  const loadSidebarData = useCallback(async () => {
    try {
      const userId = env?.VITE_USER_ID;
      // If userId is missing, only load artists to avoid 500s from invalid route
      if (userId) {
        await Promise.all([getPlaylistByUserId(userId), getAllArtists()]);
      } else {
        await getAllArtists();
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [getPlaylistByUserId, getAllArtists]);

  useEffect(() => {
    loadSidebarData();
  }, [loadSidebarData]);

  return (
    <div
      id="left-sidebar"
      className="w-full h-full overflow-x-hidden overflow-y-auto scrollbar-hide"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div id="left-sidebar-title" className="w-full space-y-3 px-1">
        <div
          id="title"
          className="flex flex-col items-center gap-4 md:gap-0 md:flex-row md:items-center justify-between"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-white/10 grid place-items-center cursor-pointer">
              <LibraryMusicRoundedIcon
                className="text-white/80 sm:!text-[20px]"
                fontSize="small"
              />
            </div>
            <h2 className="hidden md:block text-base sm:text-md lg:textlg font-semibold text-white truncate">
              คอลเลกชันของคุณ
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            {/* Add button: show on mobile and lg+ (hide on md) */}
            <button className="block md:hidden lg:block h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/10 grid place-items-center text-white/70 hover:text-white hover:bg-white/15 transition cursor-pointer">
              <AddRoundedIcon className="sm:!text-[18px]" fontSize="small" />
            </button>
            {/* Open button: show only on lg+ */}
            <button className="hidden lg:block h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/10 grid place-items-center text-white/70 hover:text-white hover:bg-white/15 transition cursor-pointer">
              <OpenInNewRoundedIcon
                className="sm:!text-[18px]"
                fontSize="small"
              />
            </button>
          </div>
        </div>
        <div id="filters" className="hidden lg:flex md:items-center gap-3 ">
          {chipCardData.length > 0 &&
            chipCardData.map((chip) => (
              <ChipCard
                key={chip.title}
                title={chip.title}
                selected={selectedTypes.has(chip.type)}
                onClick={() => handleTypeToggle(chip.type)}
              />
            ))}
        </div>
      </div>
      {/* Simple error banner when backend returns 500 */}
      {(artistError || playlistError) && (
        <div className="mx-2 mb-2 rounded bg-red-500/20 text-red-300 text-sm px-3 py-2">
          ไม่สามารถโหลดข้อมูลได้ (500). ลองรีเฟรช หรือเช็ค backend.
        </div>
      )}
      <div id="artist-list-container" className="flex flex-col gap-2 my-4">
        {filteredData.map((artist) => (
          <ArtistList
            key={artist.id}
            item={artist}
            selected={selectedId === artist.id}
            onSelect={() => {
              setSelectedId(artist.id);
              handleSelect(artist);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
