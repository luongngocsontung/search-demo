import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const AppLayout = () => {
  return (
    <div>
      {/* Header */}
      <NavBar />

      {/* Main content */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
