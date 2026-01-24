import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import spotifyLogo from "../../assets/spotify.svg";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <header className="w-full h-16  text-white flex items-center justify-between px-4 gap-4 shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-14 w-14 rounded-full text-black font-black text-xl grid place-items-center">
          <img
            src={spotifyLogo}
            alt="Spotify"
            className="w-full h-full hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            onClick={() => goToHomePage()}
          />
        </div>

        <button
          className="h-12 w-12 rounded-full bg-[#1d1d1d] border border-[#3b3b3b] grid place-items-center text-gray-200 shadow-[0_0_0_1px_rgba(0,0,0,0.45)] transition hover:border-[#5a5a5a] hover:bg-[#242424] hover:cursor-pointer"
          onClick={() => goToHomePage()}
        >
          <HomeOutlinedIcon fontSize="small" />
        </button>

        <div className="hidden md:flex items-center bg-[#1c1c1c] rounded-full h-12 px-4 gap-3 w-[320px]">
          <SearchIcon className="text-gray-300" fontSize="medium" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none text-sm  h-full text-gray-100 placeholder:text-gray-400 w-full"
          />
          <button className="hidden md:inline-flex items-center justify-center h-12 w-12 rounded-full  text-gray-200 transition ">
            <LibraryMusicIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:inline-flex items-center gap-2 h-12 px-3 rounded-full text-sm font-semibold text-white/50 transition hover:text-white">
          <DownloadForOfflineRoundedIcon
            fontSize="small"
            className="text-white/50"
          />
          <span className="whitespace-nowrap">Install App</span>
        </button>

        <button className="h-10 w-10 grid place-items-center rounded-full text-white/50 transition hover:text-white">
          <NotificationsNoneRoundedIcon fontSize="small" />
        </button>

        <button className="h-10 w-10 grid place-items-center rounded-full text-white/50 transition hover:text-white">
          <GroupRoundedIcon fontSize="small" />
        </button>

        <div className="h-12 w-12 rounded-full bg-[#1d1d1d]  flex items-center justify-center cursor-pointer hover:bg-[#242424]">
          <div className="h-8 w-8 rounded-full bg-[#3b82f6] text-black font-semibold grid place-items-center">
            P
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
