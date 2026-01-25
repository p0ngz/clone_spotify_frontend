import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import Footer from "../components/shared/Footer";

// Main layout
const MainLayout = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  return (
    <main className="w-screen min-h-screen bg-black text-white flex flex-col">
      <div id="navbar-container" className="fixed top-0 left-0 w-full h-16 flex-none z-50">
        <Navbar />
      </div>

      <div
        id="content-container"
        className="flex-1 grid grid-cols-12 gap-4 px-4 pb-4 overflow-hidden h-[60vh] mt-16"
      >
        {isHomepage && (
          <div className="col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 bg-[#111] rounded-lg overflow-y-auto overflow-x-hidden p-3 ">
            <LeftSidebar />
          </div>
        )}

        <div
          className={`${isHomepage ? "col-span-10 md:col-span-9 lg:col-span-9 xl:col-span-9 bg-[#111]" : "col-span-12 bg-transparent"}  rounded-lg overflow-y-auto overflow-x-hidden scrollbar-auto-hide p-4`}
        >
          <Outlet />
        </div>
      </div>

      <div id="audio-player-container" className="w-full px-4 pb-4 z-10">
        <Footer />
      </div>
    </main>
  );
};

export default MainLayout;
