import { useState } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchIcon from '@mui/icons-material/Search';
interface FilterBarProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const FilterBar = ({
  onSearchChange,
  placeholder = "Search by title or artist...",
}: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearchChange("");
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 transition bg-transparent ">
      <SearchIcon fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
      />

      {searchQuery && (
        <button
          onClick={handleClear}
          className="text-white/50 hover:text-white transition"
          aria-label="Clear search"
        >
          <ClearOutlinedIcon fontSize="small" />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
