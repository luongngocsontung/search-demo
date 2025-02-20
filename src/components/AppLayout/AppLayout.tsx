import { Outlet } from "react-router-dom";
import Logo from "@/assets/svgs/logo.svg?react";

const AppLayout = () => {
  return (
    <div>
      {/* Header */}
      <nav>
        <div className="flex items-center gap-2 pl-[160px] bg-[#F0F0F0] h-6">
          <Logo />
          <p className="font-[Source_Sans_Pro] text-[#5B5B5B]">
            <span>An Official Website of the </span>
            <span className="font-semibold">Singapore Government</span>
          </p>
        </div>
      </nav>
      {/* Main content */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
