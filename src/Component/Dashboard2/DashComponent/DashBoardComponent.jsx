import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import ChartPageTwo from '../Chart/ChartPageTwo';
import "./DashboardComp.css"
import DashboardInstances from './../DashboardInstances/DashboardInstances';
import whatsapiLogo from "../../../../images/watspilogo.png";
const DashBoardComponent = () => {
  const userDetails = useSelector((state) => state.userInfoStore.userDetails.userObj);
  
  const [webViewHeaderShow , setWebViewHeaderShow ] = useState (window.innerWidth >= 500);

  const HandleShowWebHeader = () =>{
    setWebViewHeaderShow(window.innerWidth >= 500)
  }
  window.addEventListener('resize' , HandleShowWebHeader)

  return (
    <div className="Dashboard-Comp-card Dashboard-Comp-card-left">
      {webViewHeaderShow ? (
      <div className='Dashboard-display'>
        <div>
          <img src={whatsapiLogo}
            alt="Profile-Image"
            style={{ cursor: 'pointer', height: "4vh" , background: "#3AAAA9" }}
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "2.5vh", color: "#3AABA7" }} />
        </div>
      </div>
      ) : (
      <p></p>
      )
      }
      <ChartPageTwo />
      <DashboardInstances />
    </div>
  );
};

export default DashBoardComponent;
