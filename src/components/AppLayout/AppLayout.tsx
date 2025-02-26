import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
      {/* Header */}
      <NavBar />

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
