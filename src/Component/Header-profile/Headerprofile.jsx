import React from 'react';
import "./Headerprofile.css";
import { Nav } from 'react-bootstrap';
import whatsapiLogo from "../../../images/watspilogo.png";
import defaultImg from "../../../images/default-img.png"
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserdetails } from '../../store/UserContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAddressBook, faUsers, faBroadcastTower } from '@fortawesome/free-solid-svg-icons';

function Headerprofile() {
  
   const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const { userDetails} =useUserdetails();

    const ShortText = ({text , maxChar}) => {
      const shorttext = (text , maxChar) => {
        if(typeof text !== "string"){
          return "";
        }
        if(text.length > maxChar){
          return text.slice(0 , maxChar) +".";
        }
        return text;
      }
      const shoortedtext = shorttext(text , maxChar);

      return<div>{shoortedtext}</div>

    } 
  return (
    <div className="header-main">
      <div>
          <img src={whatsapiLogo}
            alt="Profile-Image"
            style={{ cursor: 'pointer', height: "3.5vh" }}
          />
        </div>
        
                                <div className='header-main-items'  style={{ verticalAlign: "baseline", color: 'white'  }}>
                                    <div className='header-profile' style={{width : "11vh"}}>
                                        <img src={defaultImg} className="Profile-img-radius" alt="Profile-Image"
                                            style={{ cursor: 'pointer' , marginTop : "5px" }}
                                        />
                                        
                                        <span className='Profile-span'>
                                         <ShortText text={userDetails?.name} maxChar={9} />
                                        </span>
                                    </div>
                                    <span className='logoutbutton-and-pro' style={{ display: 'flex', alignItems: "center" , justifyContent : "space-between" }}>
            <div className='Pro-badge'>
              Pro
            </div>
            <div className='header-ball-icon-main'>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "3.5vh", color: "rgb(255 252 252 / 100%)"}} />
        </div>
            <a
              className="dropdown-item_MainInstance"
              onClick={handleLogout}
              title='Logout'
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </a>
          </span>
                                </div>
                          

    </div>
  );
}

export default Headerprofile; 