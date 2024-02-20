  // UserContext.js
  import { createContext, useState, useContext } from "react";

  const UserContext = createContext();

  const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [instanceDataUseContext , setInstanceDataUseContext] = useState(null);
    const [getAllGroupsStore , setGetAllGroupsStore] = useState([]);
    const [instanceForGroup , setInstanceForGroup ] = useState("");
    const [showGroupShareIcon , setShowGroupShareIcon ] = useState(false);
    const [sideBarRender , setSideBarRender] = useState(false);
    const [otpObj, setOtpObj] = useState({
      token: "",
      otp: "",
      email: "",
    });
    const [conformpass , setComformpass] = useState({
      email : "",
      token : "",
    });

    const updateOtpObj = (newOtpObj) => {
      setOtpObj((prevOtpObj) => ({
        ...prevOtpObj,
        ...newOtpObj,
      }));
    };

    return (
      <UserContext.Provider
        value={{ userDetails, setUserDetails, updateOtpObj, setOtpObj, otpObj , conformpass , setComformpass ,instanceDataUseContext , setInstanceDataUseContext ,
          showGroupShareIcon , setShowGroupShareIcon , instanceForGroup , setInstanceForGroup , sideBarRender , setSideBarRender , getAllGroupsStore , setGetAllGroupsStore}}
      >
        {children}
      </UserContext.Provider>
    );
  };
  const useUserdetails = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserdetails must be used within a UserProvider");
    }
    return context;
  };

  export { UserProvider, useUserdetails};
