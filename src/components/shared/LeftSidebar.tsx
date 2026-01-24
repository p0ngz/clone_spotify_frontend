import ArtistList from "./ArtistList";
import { useState } from "react";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ChipCard from "./ChipCard";

const mockArtistData = [
  {
    id: 1,
    name: "Mrs. GREEN APPLE",
    image:
      "https://plus.unsplash.com/premium_photo-1757498942847-47599549691a?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "artist",
  },
  {
    id: 2,
    name: "Yuuri",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    type: "artist",
  },
  {
    id: 3,
    name: "My playlist #2",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    type: "playlist",
  },
  {
    id: 4,
    name: "เพลยลิสต์ของคุณ #4",
    subtitle: "เพลยลิสต์ของฉัน • Pongsatorn Tassa...",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    type: "playlist",
  },
  {
    id: 5,
    name: "SUDA MASAKI",
    image:
      "https://images.unsplash.com/photo-1593382067395-ace3045a1547?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "artist",
  },
  {
    id: 6,
    name: "OFFICIAL HIGE DANDISM",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    type: "artist",
  },
  {
    id: 7,
    name: "ONE OK ROCK",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
    type: "artist",
  },
] as const;
const chipCardData = [
  { title: "เพลย์ลิสต์", type: "playlist" as const },
  { title: "ศิลปิน", type: "artist" as const },
];

// left sidebar component
const LeftSidebar = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Set<"artist" | "playlist">>(
    new Set()
  );

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
      ? mockArtistData.filter((item) => selectedTypes.has(item.type))
      : mockArtistData;
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
      <div id="artist-list-container" className="flex flex-col gap-2 my-4">
        {filteredData.map((artist) => (
          <ArtistList
            key={artist.id}
            item={artist}
            selected={selectedId === artist.id}
            onSelect={() => setSelectedId(artist.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
