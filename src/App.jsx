import React, { useEffect, createContext } from "react";
// import "./Component/Dashboard2/Sidebar/Sidebar2.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import OtpForm from "./Pages/OtpForm/otpForm";
// import { setUserDetails } from "./store/userSlice";
import axios from "axios";
import Dashboard2 from "./Component/Dashboard2/Dashboard2";
import Instances2 from "./Component/IntancesComponent/instances2";
import { decryption } from "./helpers/encryptionDecryption";
import InstancePage2 from "./Component/InstancePage/InstancePage2";
import Setting2 from "./Component/SettingPage/Setting2";
import MyContact2 from "./Component/MyContactPage/MyContact2";
import Groups2 from "./Component/GroupsComp2/Groups2";
import CreateGroup2 from "./Component/GroupsComp2/CreateGroup2";
import CreateBroadCast2 from "./Component/BroadCast2/CreateBroadCast2";
import Header2 from "./Component/header/header2";
import CreateContact from "./Component/create-new-contact/CreateContact";
// import { UserAreasProvider, UserProvider } from "./store/UserContext";
// import { useUserdetails } from "./store/UserContext";
import Getcontactinfo from "./Component/create-new-contact/Getcontactinfo";
import Forgotpass from "./Component/Forgotpasss/Forgotpass";
import ForgatOtp from "./Component/Forgotpasss/ForgatOtp";
import Newpassword from "./Component/Forgotpasss/Newpassword";
import { useUserdetails } from "./store/UserContext";
import GetALLInstances from "./helpers/GetApis/GetALLInstance";
import GetSingleGroup from "./Component/GroupsComp2/GetSingleGroup";
// const Layout = lazy(()=> import('./Layout'))
import Layout from "./Layout";

const App = () => {
  // const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  const {
    userDetails,
    setUserDetails,
    instanceDataUseContext,
    setInstanceDataUseContext,
  } = useUserdetails();
  const userId = userDetails?._id;
  console.log(userId);

  useEffect(() => {
    // Your token expiration logic
    if (!token && window.location.pathname !== "/") {
      localStorage.removeItem("token");
      window.location.replace("/");
    } else if (token && window.location.pathname === "/") {
      window.location.href = "/dashboard2";
    }
  }, [token]);

  //ALL instances
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetALLInstances(userId);
        console.log(data?.message, "datadatadata");
        setInstanceDataUseContext(data?.message);
        // setInstancesData(data?.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userDetails]);

  // END GET INSTANCE API

  useEffect(() => {
    // console.log("this ran");
    if (token) {
      axios
        .get(
          `https://watspi-dev-aa7972875395.herokuapp.com/api/users/currentUser/${token}`
        )
        .then((response) => {
          console.log(response);
          console.log(token);
          if (token) {
            console.log(token, "tokeninside");
            const decrypted = decryption(response?.data?.data);
            console.log(decrypted?.userObj, "decrypted");
            // dispatch(setUserDetails(decrypted));
            setUserDetails(decrypted?.userObj);
            const a = decryption(response?.data?.data);
            console.log(setUserDetails, "setUserDetailssetUserDetails");
            console.log(decrypted?.userObj, "current user");
          } else {
            localStorage.removeItem("token");
            return;
          }
        })
        .catch((error) => {
          console.log("micc", error);
          localStorage.removeItem("token");
          return;
        });
    }
  }, [token]);

  // console.log(userDetails, "userdea");
  return (
    <BrowserRouter>
      {/* <Sidebar2 /> */}
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/otpForm"} element={<OtpForm />} />
        <Route path={"/forgototp"} element={<ForgatOtp />} />
        <Route path={"/createcontact"} element={<CreateContact />} />
        <Route path={"/getcontactinfo"} element={<Getcontactinfo />} />
        <Route path={"/forgotpass"} element={<Forgotpass />} />
        <Route path={"/newpassword"} element={<Newpassword />} />

        <Route element={<Layout />}>
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route path="/header2" element={<Header2 />} />
          <Route path="/Instances2" element={<Instances2 />} />
          <Route path="/instancePage2/:id" element={<InstancePage2 />} />
          <Route path={"/settings2"} element={<Setting2 />} />
          <Route path={"/myContact2"} element={<MyContact2 />} />
          <Route path={"/groups2"} element={<Groups2 />} />
          <Route path={"/creategroup2"} element={<CreateGroup2 />} />
          <Route path={"/createBroadCast2"} element={<CreateBroadCast2 />} />
          <Route path={"/getsinglegroup/:group_id"} element={<GetSingleGroup />}
          />
        </Route>

        {/* <Route element={<HeaderComponent />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/settings"} element={<Setting />} />
          <Route path={"/groups"} element={<Groups />} />
          <Route path={"/creategroup"} element={<CreateGroup />} />
          <Route path={"/myContact"} element={<MyContact />} />
          <Route path="/instancePage/:id" element={<InstancePage />} />
          <Route path={"/mybroadCast"} element={<MyBroadCast />} />
          <Route path={"/broadCast"} element={<BroadCast />} />
          <Route path={"/instances"} element={<Instances />} />
        </Route> */}
        
        {/* </Provider> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
