import Navbar from "@/components/Navbar";
import {Outlet} from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between p-8 w-full h-screen">
        <div className="flex flex-1 p-4 justify-center">
          <Outlet />
        </div>
        <p className="signature p-2 text-center hyperlink">made by <a href="https://github.com/ZirkonCZ">Zirkon</a></p>
      </div>
    </>
);
}

export default MainLayout;
