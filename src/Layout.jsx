import React from "react";
import "./Component/Dashboard2/Sidebar/Sidebar2.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard2 from "./Component/Dashboard2/Dashboard2";
import Sidebar2 from "./Component/Dashboard2/Sidebar/Sidebar2";
import Instances2 from "./Component/IntancesComponent/instances2";
import InstancePage2 from "./Component/InstancePage/InstancePage2";
import Setting2 from "./Component/SettingPage/Setting2";
import MyContact2 from "./Component/MyContactPage/MyContact2";
import Groups2 from "./Component/GroupsComp2/Groups2";
import CreateGroup2 from "./Component/GroupsComp2/CreateGroup2";
import CreateBroadCast2 from "./Component/BroadCast2/CreateBroadCast2";
import Header2 from "./Component/header/header2";
import GetSingleGroup from "./Component/GroupsComp2/GetSingleGroup";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Sidebar2>
      <Outlet />
      {/* <Routes>

        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/header2" element={<Header2 />} />
        <Route path="/Instances2" element={<Instances2 />} />
        <Route path="/instancePage2/:id" element={<InstancePage2 />} />
        <Route path={"/settings2"} element={<Setting2 />} />
        <Route path={"/myContact2"} element={<MyContact2 />} />
        <Route path={"/groups2"} element={<Groups2 />} />
        <Route path={"/creategroup2"} element={<CreateGroup2 />} />
        <Route path={"/createBroadCast2"} element={<CreateBroadCast2 />} />
        <Route
          path={"/getsinglegroup/:group_id"}
          element={<GetSingleGroup />}
        />
      </Routes> */}
    </Sidebar2>
  );
};

export default Layout;
