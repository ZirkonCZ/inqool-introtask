import Navbar from "@/components/Navbar";
import {Outlet} from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="flex flex-1 p-8 w-full justify-center">
        <Outlet />
      </div>
    </>
);
}

export default MainLayout;
