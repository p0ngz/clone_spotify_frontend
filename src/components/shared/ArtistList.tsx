import ArtistIcon from "./ArtistIcon";
interface Artist {
  id: string;
  name: string;
  image: string;
  type: "artist" | "playlist";
}

interface ArtistListProps {
  item: Artist;
  selected?: boolean;
  onSelect?: () => void;
}

const ArtistList = ({ item, selected = false, onSelect }: ArtistListProps) => {
  return (
    <div
      className="w-full h-full flex justify-center items-center md:gap-3 p-2 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition"
      onClick={onSelect}
    >
      <div id="artist-icon" className="flex-shrink-0">
        <ArtistIcon arTistImg={item.image} artistTitle={item.name} />
      </div>
      <div
        id="artist-title"
        className="hidden md:block flex flex-col items-start justify-center flex-1 min-w-0"
      >
        <h1 className={`text-sm font-medium truncate ${selected ? "text-green-600" : "text-white"}`}>
          {item.name}
        </h1>
        <span className="text-xs text-gray-500 truncate">{item.type}</span>
      </div>
    </div>
  );
};

export default ArtistList;
