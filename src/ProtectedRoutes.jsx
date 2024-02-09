import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard2 from './Component/Dashboard2/Dashboard2';
import Instances2 from './Component/IntancesComponent/instances2';
import InstancePage2 from './Component/InstancePage/InstancePage2';
import Setting2 from './Component/SettingPage/Setting2';
import MyContact2 from './Component/MyContactPage/MyContact2';
import Groups2 from './Component/GroupsComp2/Groups2';
import CreateGroup2 from './Component/GroupsComp2/CreateGroup2';
import CreateBroadCast2 from './Component/BroadCast2/CreateBroadCast2';

function ProtectedRoutes() {
    const navigate = useNavigate();
    useEffect(() => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (!token) {
            window.location.href = "/"; 
          }
        }
      }, []);
    return (
        <>
            <Routes>
                <Route path="/dashboard2" element={<Dashboard2 />} />
                <Route path="/Instances2" element={<Instances2 />} />
                <Route path="/instancePage2/:id" element={<InstancePage2 />} />
                <Route path="/settings2" element={<Setting2 />} />
                <Route path="/myContact2" element={<MyContact2 />} />
                <Route path="/groups2" element={<Groups2 />} />
                <Route path="/creategroup2" element={<CreateGroup2 />} />
                <Route path="/createBroadCast2" element={<CreateBroadCast2 />} />
            </Routes>
        </>
    )
}

export default ProtectedRoutes
