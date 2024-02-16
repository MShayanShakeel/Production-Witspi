import React, { useEffect, useState } from "react";
import "./sidebar2.css";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import whatsapiLogo from "../../../../images/watspilogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiMenuFoldLine } from "react-icons/ri";
import { PiListFill } from "react-icons/pi";
import { PiListPlusBold } from "react-icons/pi";
import {
  faAddressBook,
  faUsers,
  faBroadcastTower,
  faHouse,
  faUserGroup,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useUserdetails } from "../../../store/UserContext";

function Sidebar2() {
  const { sideBarRender, setSideBarRender } = useUserdetails();
  const location = useLocation();
  console.log(location.pathname, "locationparhname");

  const [onMouseEnter, setOnMouseEnter] = useState(true);
  const [expand, setExpand] = useState(true);

  console.log("i rannn");

  console.log(sideBarRender, " sideBarRender");
  console.log(expand, " expand");

  // useEffect(() => {
  //   if(!setSideBarRender){
  //     setSideBarRender(!)
  //   }
  // }, [sideBarRender]);

  const handleMouseEnter = () => {
    setOnMouseEnter(true);
  };

  const handleMouseLeave = () => {
    setOnMouseEnter(false);
  };

  const iconSize = "1.5rem";
  return (
    <div className="Sidebar-Container">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="Sidebar-Comp-card"
        style={{ position: "relative", height: "95vh" }}
      >
        <div
          className="sidebar-content-wrapper"
          style={{
            transition: "height 2s ease, opacity 2s ease",
          }}
        >
          {onMouseEnter || expand ? (
            <>
              <div className="main-sidebar-logo Svg-Container svg-white shayan-sidebar-temp">
                <div className="Svg-Container svg-white">
                  <div>
                    <PiListFill
                    onClick={()=> {
                      setExpand(!expand)
                      setSideBarRender(expand)
                    }}
                      style={{
                        width: iconSize,
                        height: iconSize,
                        marginRight: "0.5rem",
                        cursor : "pointer"
                      }}
                    />
                    {/* {expand ? <PiListFill /> : </>  } */}
                  </div>
                  <div>
                  <img
                  src={whatsapiLogo}
                  alt="Profile-Image"
                  style={{
                    // width : "7rem",
                    cursor: "pointer",
                    height: "4vh",
                    background: "#388c8c",
                    borderRadius: "10px",
                  }}
                />
                  </div>
                  </div>
                {/* <PiListFill style={{ width: iconSize, height: iconSize }} /> */}
               
              </div>
              <Link
                to="/dashboard2"
                className={`mb-2 main-sidebar2 ${
                  location.pathname === "/dashboard2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faHouse}
                      style={{
                        width: iconSize,
                        height: iconSize,
                        // color: "white",
                        paddingLeft: "0.5rem",
                        
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        marginTop: "0.2rem",
                        textDecoration: "none",
                        marginRight: "0.5rem",
                      }}
                    >
                      Dashboard
                    </h6>
                  </div>
                  <title>Dashboard</title>
                  <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.070312 4.3222656 L 8.8730469 15.521484 C 7.0935305 16.919676 6 19.100391 6 21.400391 L 6 40.5 C 6 41.133333 6.2367979 41.80711 6.7148438 42.285156 C 7.1928895 42.763202 7.8666667 43 8.5 43 L 18.5 43 C 19.133333 43 19.80711 42.763202 20.285156 42.285156 C 20.763202 41.80711 21 41.133333 21 40.5 L 21 30.5 C 21 30.218182 21.218182 30 21.5 30 L 26.5 30 C 26.781818 30 27 30.218182 27 30.5 L 27 40.5 C 27 41.133333 27.236798 41.80711 27.714844 42.285156 C 28.19289 42.763202 28.866667 43 29.5 43 L 39.5 43 C 40.133333 43 40.80711 42.763202 41.285156 42.285156 C 41.763202 41.80711 42 41.133333 42 40.5 L 42 21.400391 C 42 19.155946 41.012069 16.901298 39.087891 15.490234 L 24.929688 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.271484 17.876953 A 1.50015 1.50015 0 0 0 37.3125 17.910156 C 38.388318 18.699095 39 20.044835 39 21.400391 L 39 40 L 30 40 L 30 30.5 C 30 28.581818 28.418182 27 26.5 27 L 21.5 27 C 19.581818 27 18 28.581818 18 30.5 L 18 40 L 9 40 L 9 21.400391 C 9 20.100391 9.7060794 18.680715 10.726562 17.878906 A 1.50015 1.50015 0 0 0 10.728516 17.876953 L 24 7.4101562 z" />
                </div>
              </Link>
              <Link
                to="/instances2"
                className={`mb-2 main-sidebar2 ${
                  location.pathname === "/instances2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={100}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      style={{
                        width: iconSize,
                        height: iconSize,
                        // color: "white",
                        paddingLeft: "0.5rem",
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        textDecoration: "none",
                        marginTop: "0.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      Instance
                    </h6>
                  </div>
                  <title>Instances</title>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </div>
              </Link>
              <Link
                to="/myContact2"
                className={`mb-2 main-sidebar2 ${
                  location.pathname === "/myContact2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={100}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faAddressBook}
                      title="MyContacts"
                      style={{
                        width: iconSize,
                        height: iconSize,
                        paddingLeft: "0.5rem",
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        textDecoration: "none",
                        marginTop: "0.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      Contact
                    </h6>
                  </div>
                </div>
              </Link>
              {/* </Nav.Link> */}
              <Link
                to="/createBroadCast2"
                className={`mb-2 main-sidebar2 broad-cast-icon ${
                  location.pathname === "/createBroadCast2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={100}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faBroadcastTower}
                      title="Create BroadCast"
                      style={{
                        width: iconSize,
                        height: iconSize,
                        paddingLeft: "0.5rem",
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        textDecoration: "none",
                        marginTop: "0.2rem",
                        marginRight: "0.5rem",
                      }}
                    >
                      BroadCast
                    </h6>
                  </div>
                </div>
              </Link>
              <Link
                to="/Groups2"
                className={`mb-2 main-sidebar2 ${
                  location.pathname === "/Groups2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={100}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faUsers}
                      title="MyContacts"
                      style={{
                        width: iconSize,
                        height: iconSize,
                        paddingLeft: "0.5rem",
                        marginRight: "0.5rem",
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        // marginTop: "0.2rem",
                        textDecoration: "none",
                      }}
                    >
                      Groups
                    </h6>
                  </div>
                </div>
              </Link>

              <Link
                to="/settings2"
                className={`mb-2 main-sidebar2 ${
                  location.pathname === "/settings2" ? "active-link" : ""
                }`}
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={100}
              >
                <div className="Svg-Container svg-white">
                  <div>
                    <FontAwesomeIcon
                      icon={faGear}
                      title="setting"
                      style={{
                        width: iconSize,
                        height: iconSize,
                        paddingLeft: "0.5rem",
                      }}
                    />
                  </div>
                  <div>
                    <h6
                      style={{
                        marginLeft: "1rem",
                        marginTop: "0.2rem",
                        textDecoration: "none",
                        marginRight: "0.5rem",
                      }}
                    >
                      Setting
                    </h6>
                  </div>

                  <title>Settings</title>
                  <path d="M 9.6660156 2 L 9.2148438 4.4765625 L 9.2285156 4.4707031 L 9.3574219 4.4296875 C 9.3071239 4.442262 9.2639589 4.4626482 9.2148438 4.4765625 C 8.2970203 4.7365804 7.576324 5.2179722 6.9589844 5.7324219 L 6.9257812 5.7617188 L 6.9238281 5.7617188 L 4.5351562 5.0039062 L 2.2382812 8.9863281 L 4.1113281 10.748047 L 4.1191406 10.703125 L 4.1289062 10.658203 C 3.9908562 11.210378 4 11.7 4 12 C 4 12.3 3.9990261 12.795912 4.1191406 13.396484 L 4.1074219 13.332031 L 2.2246094 14.992188 L 4.5527344 19.027344 L 6.9433594 18.158203 L 6.9628906 18.177734 L 7.0449219 18.232422 C 7.6875911 18.660868 8.4330772 19.088227 9.2070312 19.419922 L 9.2109375 19.421875 L 9.6582031 22 L 14.333984 22 L 14.785156 19.523438 L 14.771484 19.529297 L 14.642578 19.570312 C 14.692876 19.557738 14.736041 19.537352 14.785156 19.523438 C 15.70298 19.26342 16.423675 18.782028 17.041016 18.267578 L 17.074219 18.238281 L 17.076172 18.238281 L 19.476562 19.001953 L 21.765625 14.882812 L 19.892578 13.230469 L 19.880859 13.296875 L 19.871094 13.341797 C 20.009129 12.789573 20 12.3 20 12 C 20 11.7 20.0091 11.210382 19.871094 10.658203 L 19.876953 10.683594 L 21.775391 9.0078125 L 19.447266 4.9726562 L 17.056641 5.8417969 L 17.037109 5.8222656 L 16.955078 5.7675781 C 16.312365 5.3391322 15.566923 4.9117728 14.792969 4.5800781 L 14.789062 4.578125 L 14.341797 2 L 9.6660156 2 z M 11.333984 4 L 12.658203 4 L 13.009766 6.0214844 L 14.029297 6.4277344 L 14.005859 6.4199219 C 14.611316 6.6794033 15.240023 7.0391194 15.785156 7.3984375 L 16.542969 8.1582031 L 18.552734 7.4257812 L 19.224609 8.5917969 L 17.722656 9.9179688 L 17.919922 11.103516 L 17.929688 11.142578 C 17.991611 11.390399 18 11.7 18 12 C 18 12.3 17.991597 12.609601 17.929688 12.857422 L 17.923828 12.880859 L 17.707031 13.96875 L 19.234375 15.318359 L 18.523438 16.599609 L 16.523438 15.962891 L 15.746094 16.740234 C 15.202979 17.191429 14.762748 17.47777 14.158203 17.628906 L 14.091797 17.646484 L 13.015625 18.076172 L 12.666016 20 L 11.341797 20 L 10.990234 17.978516 L 9.9707031 17.572266 L 9.9941406 17.580078 C 9.3886846 17.320609 8.7599774 16.960881 8.2148438 16.601562 L 7.4570312 15.841797 L 5.4472656 16.574219 L 4.7753906 15.408203 L 6.2929688 14.068359 L 6.0800781 13.003906 C 6.0001926 12.604479 6 12.3 6 12 C 6 11.7 6.0083605 11.390399 6.0703125 11.142578 L 6.0761719 11.119141 L 6.2890625 10.052734 L 4.7617188 8.6132812 L 5.4648438 7.3964844 L 7.4765625 8.0371094 L 8.2539062 7.2597656 C 8.7970213 6.8085705 9.2372522 6.5222299 9.8417969 6.3710938 L 9.9082031 6.3535156 L 10.984375 5.9238281 L 11.333984 4 z M 12 8 C 9.7901961 8 8 9.7901961 8 12 C 8 14.209804 9.7901961 16 12 16 C 14.209804 16 16 14.209804 16 12 C 16 9.7901961 14.209804 8 12 8 z M 12 10 C 13.190196 10 14 10.809804 14 12 C 14 13.190196 13.190196 14 12 14 C 10.809804 14 10 13.190196 10 12 C 10 10.809804 10.809804 10 12 10 z" />
                </div>
              </Link>

              {/* <h5
                onClick={() => {
                  setExpand(!expand);
                  setSideBarRender(expand);
                  // handleMouseEnter();
                }}
                style={{
                  color: "#388C8C",
                  position: "absolute",
                  bottom: 0,
                  left: 20,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.5s ease",
                }}
              >
                {expand ? "<-- Close" : "Expand --> "}
              </h5> */}
          
          
            </>
          ) : (
            <p>
              <>
                <div className="main-sidebar-logo Svg-Container svg-white">
                  <PiListPlusBold
                  style={{ width: iconSize, height: iconSize , cursor : "pointer" }} />
                </div>
                <Link
                  to="/dashboard2"
                  className={`mb-2 main-sidebar2 ${
                    location.pathname === "/dashboard2" ? "active-link" : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faHouse}
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  Dashboard
                </h6> */}
                    </div>
                    <title>Dashboard</title>
                    <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.070312 4.3222656 L 8.8730469 15.521484 C 7.0935305 16.919676 6 19.100391 6 21.400391 L 6 40.5 C 6 41.133333 6.2367979 41.80711 6.7148438 42.285156 C 7.1928895 42.763202 7.8666667 43 8.5 43 L 18.5 43 C 19.133333 43 19.80711 42.763202 20.285156 42.285156 C 20.763202 41.80711 21 41.133333 21 40.5 L 21 30.5 C 21 30.218182 21.218182 30 21.5 30 L 26.5 30 C 26.781818 30 27 30.218182 27 30.5 L 27 40.5 C 27 41.133333 27.236798 41.80711 27.714844 42.285156 C 28.19289 42.763202 28.866667 43 29.5 43 L 39.5 43 C 40.133333 43 40.80711 42.763202 41.285156 42.285156 C 41.763202 41.80711 42 41.133333 42 40.5 L 42 21.400391 C 42 19.155946 41.012069 16.901298 39.087891 15.490234 L 24.929688 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.271484 17.876953 A 1.50015 1.50015 0 0 0 37.3125 17.910156 C 38.388318 18.699095 39 20.044835 39 21.400391 L 39 40 L 30 40 L 30 30.5 C 30 28.581818 28.418182 27 26.5 27 L 21.5 27 C 19.581818 27 18 28.581818 18 30.5 L 18 40 L 9 40 L 9 21.400391 C 9 20.100391 9.7060794 18.680715 10.726562 17.878906 A 1.50015 1.50015 0 0 0 10.728516 17.876953 L 24 7.4101562 z" />
                  </div>
                </Link>
                <Link
                  to="/instances2"
                  className={`mb-2 main-sidebar2 ${
                    location.pathname === "/instances2" ? "active-link" : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  Instance
                </h6> */}
                    </div>
                    <title>Instances</title>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </div>
                </Link>
                <Link
                  to="/myContact2"
                  className={`mb-2 main-sidebar2 ${
                    location.pathname === "/myContact2" ? "active-link" : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faAddressBook}
                        title="MyContacts"
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  Contact
                </h6> */}
                    </div>
                  </div>
                </Link>
                {/* </Nav.Link> */}
                <Link
                  to="/createBroadCast2"
                  className={`mb-2 main-sidebar2 broad-cast-icon ${
                    location.pathname === "/createBroadCast2"
                      ? "active-link"
                      : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faBroadcastTower}
                        title="Create BroadCast"
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  BroadCast
                </h6> */}
                    </div>
                  </div>
                </Link>
                <Link
                  to="/Groups2"
                  className={`mb-2 main-sidebar2 ${
                    location.pathname === "/Groups2" ? "active-link" : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faUsers}
                        title="MyContacts"
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  Groups
                </h6> */}
                    </div>
                  </div>
                </Link>

                <Link
                  to="/settings2"
                  className={`mb-2 main-sidebar2 ${
                    location.pathname === "/settings2" ? "active-link" : ""
                  }`}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={100}
                >
                  <div className="Svg-Container svg-white">
                    <div>
                      <FontAwesomeIcon
                        icon={faGear}
                        title="setting"
                        style={{ width: iconSize, height: iconSize }}
                      />
                    </div>
                    <div>
                      {/* <h6 style={{ marginLeft: "1rem", textDecoration: "none" }}>
                  Setting
                </h6> */}
                    </div>

                    <title>Settings</title>
                    <path d="M 9.6660156 2 L 9.2148438 4.4765625 L 9.2285156 4.4707031 L 9.3574219 4.4296875 C 9.3071239 4.442262 9.2639589 4.4626482 9.2148438 4.4765625 C 8.2970203 4.7365804 7.576324 5.2179722 6.9589844 5.7324219 L 6.9257812 5.7617188 L 6.9238281 5.7617188 L 4.5351562 5.0039062 L 2.2382812 8.9863281 L 4.1113281 10.748047 L 4.1191406 10.703125 L 4.1289062 10.658203 C 3.9908562 11.210378 4 11.7 4 12 C 4 12.3 3.9990261 12.795912 4.1191406 13.396484 L 4.1074219 13.332031 L 2.2246094 14.992188 L 4.5527344 19.027344 L 6.9433594 18.158203 L 6.9628906 18.177734 L 7.0449219 18.232422 C 7.6875911 18.660868 8.4330772 19.088227 9.2070312 19.419922 L 9.2109375 19.421875 L 9.6582031 22 L 14.333984 22 L 14.785156 19.523438 L 14.771484 19.529297 L 14.642578 19.570312 C 14.692876 19.557738 14.736041 19.537352 14.785156 19.523438 C 15.70298 19.26342 16.423675 18.782028 17.041016 18.267578 L 17.074219 18.238281 L 17.076172 18.238281 L 19.476562 19.001953 L 21.765625 14.882812 L 19.892578 13.230469 L 19.880859 13.296875 L 19.871094 13.341797 C 20.009129 12.789573 20 12.3 20 12 C 20 11.7 20.0091 11.210382 19.871094 10.658203 L 19.876953 10.683594 L 21.775391 9.0078125 L 19.447266 4.9726562 L 17.056641 5.8417969 L 17.037109 5.8222656 L 16.955078 5.7675781 C 16.312365 5.3391322 15.566923 4.9117728 14.792969 4.5800781 L 14.789062 4.578125 L 14.341797 2 L 9.6660156 2 z M 11.333984 4 L 12.658203 4 L 13.009766 6.0214844 L 14.029297 6.4277344 L 14.005859 6.4199219 C 14.611316 6.6794033 15.240023 7.0391194 15.785156 7.3984375 L 16.542969 8.1582031 L 18.552734 7.4257812 L 19.224609 8.5917969 L 17.722656 9.9179688 L 17.919922 11.103516 L 17.929688 11.142578 C 17.991611 11.390399 18 11.7 18 12 C 18 12.3 17.991597 12.609601 17.929688 12.857422 L 17.923828 12.880859 L 17.707031 13.96875 L 19.234375 15.318359 L 18.523438 16.599609 L 16.523438 15.962891 L 15.746094 16.740234 C 15.202979 17.191429 14.762748 17.47777 14.158203 17.628906 L 14.091797 17.646484 L 13.015625 18.076172 L 12.666016 20 L 11.341797 20 L 10.990234 17.978516 L 9.9707031 17.572266 L 9.9941406 17.580078 C 9.3886846 17.320609 8.7599774 16.960881 8.2148438 16.601562 L 7.4570312 15.841797 L 5.4472656 16.574219 L 4.7753906 15.408203 L 6.2929688 14.068359 L 6.0800781 13.003906 C 6.0001926 12.604479 6 12.3 6 12 C 6 11.7 6.0083605 11.390399 6.0703125 11.142578 L 6.0761719 11.119141 L 6.2890625 10.052734 L 4.7617188 8.6132812 L 5.4648438 7.3964844 L 7.4765625 8.0371094 L 8.2539062 7.2597656 C 8.7970213 6.8085705 9.2372522 6.5222299 9.8417969 6.3710938 L 9.9082031 6.3535156 L 10.984375 5.9238281 L 11.333984 4 z M 12 8 C 9.7901961 8 8 9.7901961 8 12 C 8 14.209804 9.7901961 16 12 16 C 14.209804 16 16 14.209804 16 12 C 16 9.7901961 14.209804 8 12 8 z M 12 10 C 13.190196 10 14 10.809804 14 12 C 14 13.190196 13.190196 14 12 14 C 10.809804 14 10 13.190196 10 12 C 10 10.809804 10.809804 10 12 10 z" />
                  </div>
                </Link>
                {/* <span>
                <h5
                  onClick={() => {
                    setExpand(!expand);
                    setSideBarRender(expand);
                    // handleMouseEnter();
                  }}
                  style={{
                    color: "#388C8C",
                    position: "absolute",
                    bottom: 0,
                    left: 20,
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                  }}
                >
                  {expand ? "<-- Close" : "Expand --> "}
                </h5>
                </span> */}
              </>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar2;
