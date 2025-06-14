import Navbar from "@/components/Navbar";
import {Outlet} from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between p-8 w-full min-h-[var(--minh)] h-full">
        <div className="flex flex-1 p-4 justify-center">
          <Outlet />
        </div>
        <p className="p-2 text-center italic">made by <a href="https://github.com/ZirkonCZ" className="hyperlink">Zirkon</a></p>
      </div>
    </>
);
}

export default MainLayout;
