import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Sidebar2 from "./Component/Dashboard2/Sidebar/Sidebar2";

const Layout = () => {
  return (
    <>
      <Sidebar2 />
      <Outlet />
    </>
  );
};

export default Layout;
