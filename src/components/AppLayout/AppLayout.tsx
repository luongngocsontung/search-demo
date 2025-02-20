import { Outlet } from "react-router-dom";
import Logo from "@/assets/svgs/logo.svg?react";

const AppLayout = () => {
  return (
    <div>
      {/* Header */}
      <nav>
        <div className="flex items-center gap-2 pl-[160px] bg-[#F0F0F0] h-6">
          <Logo />
          <p>An Official Website of the Singapore Government</p>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default AppLayout;
