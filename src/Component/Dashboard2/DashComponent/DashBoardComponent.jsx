import React, { useEffect, useState } from "react";
// import { Nav } from 'react-bootstrap';
// import whatsapiLogo from "../../../images/watspilogo.png";
// import defaultImg from "../../../images/default-img.png"
import { FaArrowRight } from "react-icons/fa6";
import BGbroadcast from "../../../../images/Frame13.png";
import {
  faBell,
  faCheck,
  faEdit,
  faEllipsisV,
  faShare,
  faSignOutAlt,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChartPageTwo from "../Chart/ChartPageTwo";
import "./DashboardComp.css";
import { GrView } from "react-icons/gr";
import { RiMessage2Fill } from "react-icons/ri";
import { IoIosCloudDone } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import Loader from "../../../Pages/Loader";
import { useUserdetails } from "../../../store/UserContext";
import { Link } from "react-router-dom";

// import { useUserdetails } from '../../store/UserContext';
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';

// import DashboardInstances from "./../DashboardInstances/DashboardInstances";
// import whatsapiLogo from "../../../../images/watspilogo.png";
const DashBoardComponent = () => {
  const {
    userDetails,
    instanceDataUseContext,
    getAllGroupsStore,
    getAllMessagesStore,
    getAllContactStore,
  } = useUserdetails();
  const [loader, setLoader] = useState(true);

  const ShortText = ({ text, maxChar }) => {
    const shorttext = (text, maxChar) => {
      if (typeof text !== "string") {
        return "";
      }
      if (text.length > maxChar) {
        return text.slice(0, maxChar) + ".";
      }
      return text;
    };
    const shoortedtext = shorttext(text, maxChar);

    return <div>{shoortedtext}</div>;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 900);
    return () => clearTimeout(timer);
  });

  // const [webViewHeaderShow , setWebViewHeaderShow ] = useState (window.innerWidth >= 500);
  // const HandleShowWebHeader = () =>{
  //   setWebViewHeaderShow(window.innerWidth >= 500)
  // }
  // window.addEventListener('resize' , HandleShowWebHeader)
  console.log(userDetails, "getAllGroupsStore");

  return (
    <>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12}>
          <div className="grid-container">
            <div className="item1 Graph-main-class all-div-widths">
              <div>
                <div
                  className="profile-messages-section message-section-width"
                  style={{ margin: "2rem" }}
                >
                  <h3
                    style={{
                      textAlign: "start",
                      margin: "10px 0 10px 5px",
                      color: "#388c8c",
                      marginBottom: "1.5rem",
                    }}
                  >
                    My Revenue Graph
                  </h3>
                </div>
              </div>
              <ChartPageTwo />
            </div>

            {/* DASHBOARD MESSAGES SECTION CODE START  */}
            <div className="item2 menu-main-class all-div-widths">
              <div className="row">
                <div className="profile-section col-12">
                  <div className="Profile-Upper-section">
                    <div className="Good-evening">
                      <h6>Good Evening</h6>
                    </div>
                    <div className="profile-icons">
                      {" "}
                      <span
                        className="logoutbutton-and-pro"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="Pro-badge">Pro</div>
                        <div className="header-ball-icon-main">
                          <FontAwesomeIcon
                            icon={faBell}
                            style={{
                              fontSize: "3.5vh",
                              color: "rgb(255 252 252 / 100%)",
                            }}
                          />
                        </div>
                        <a
                          className="dropdown-item_MainInstance"
                          // onClick={handleLogout}
                          title="Logout"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="Profile-lower-section">
                    <div
                      className="deshbord-profile-picture"
                      style={{ verticalAlign: "baseline", color: "#FCFCFD" }}
                    >
                      <div
                        className="deshbord-header-profile"
                        style={{ width: "11vh", background: "#FCFCFD" }}
                      >
                        <span
                          className="deshbord-profile-Main-digit centered-span"
                          style={{ color: "black" }}
                        >
                          <ShortText text={userDetails?.name} maxChar={1} />
                        </span>

                        <span className="Profile-span">
                          <p
                            style={{
                              display: "flex",
                              alignItems: " center",
                              marginTop: "5px",
                              color: "black",
                            }}
                          >
                            {userDetails?.name}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="profile-messages-section">
                    <h4
                      style={{
                        textAlign: "start",
                        margin: "8px 5px",
                        color: "#388c8c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Messages
                    </h4>
                  </div>
                  {/* <div className="message-main-card">
                    <div className="message-singel-card">
                      <div
                        className="deshbord-header-profile"
                        style={{ width: "11vh" }}
                      >
                        {getAllMessagesStore
                          .slice(0, 2)
                          .map((message, index) => (
                            <>
                              <span className="deshbord-profile-Main-digit centered-span">
                                <ShortText
                                  text={message.chatId?.firstName}
                                  maxChar={1}
                                />
                              </span>
                              <div
                                className="single-message-contact"
                                key={index}
                              >
                                <span
                                  className="Profile-span-name"
                                  style={{ color: "#388c8c" }}
                                >
                                  {message.chatId?.firstName}
                                </span>
                                <span
                                  className="Profile-span-name"
                                  style={{ width: "95%" }}
                                >
                                  <ShortText
                                    text={message.message}
                                    maxChar={64}
                                  />
                                </span>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="message-main-card"
                    style={{
                      // width: "22rem",
                      marginLeft: "0.5rem",
                      padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                    }}
                  >
                    <div className="message-singel-card">
                      {loader && (
                        <Loader top={50} height={50} width={50} left={50} />
                      )}
                      {getAllMessagesStore?.length === 0 ? (
                        <p>Groups Not Available</p>
                      ) : (
                        getAllMessagesStore?.slice(0, 2).map((message) => (
                          <div className="single-message-contact">
                            <span
                              className="deshbord-profile-Main-digit centered-span"
                              style={{ color: "black" }}
                            >
                              <ShortText text={userDetails?.name} maxChar={1} />
                            </span>
                            <div className="Profile-messags-padding-2rem">
                              <div className="Profile-messags-padding-2rem">
                                <span
                                  className="Profile-span-name"
                                  style={{ color: "#388c8c" }}
                                >
                                  {message.chatId?.firstName}
                                </span>
                                <span
                                  className="Profile-span-name"
                                  style={{ width: "95%" }}
                                >
                                  <ShortText
                                    text={message.message}
                                    maxChar={64}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* DASHBOARD MESSAGES SECTION CODE END  */}

            {/* BROADCAST SECTION CODE START  */}
            <div className="item3 broadcast-main-div-height all-div-widths">
              <div
                className="image-container"
                style={{
                  backgroundImage: `url(${BGbroadcast})`,
                  width: "100%",
                  height: "160px",
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "20px",
                }}
              >
                <img
                  src={BGbroadcast}
                  alt="Broadcast Background"
                  style={{
                    width: "100%",
                    height: "100%",
                    transition:
                      "transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)", // Transition for zoom effect
                  }}
                />
              </div>
              <div className="message-main-card">
                {/* <div className="message-singel-card">
                  <div
                    className="deshbord-header-profile"
                    style={{ width: "11vh" }}
                  >
                    {getAllMessagesStore.slice(0, 2).map((message, index) => (
                      <>
                        <span className="deshbord-profile-Main-digit centered-span">
                          <ShortText
                            text={message.chatId?.firstName}
                            maxChar={1}
                          />
                        </span>
                        <div className="single-message-contact" key={index}>
                          <span
                            className="Profile-span-name"
                            style={{ color: "#388c8c" }}
                          >
                            {message.chatId?.firstName}
                          </span>
                          <span
                            className="Profile-span-name"
                            style={{ width: "95%" }}
                          >
                            <ShortText text={message.message} maxChar={64} />
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                </div> */}
                <div
                  className="deshbord-Group-contant"
                  style={{
                    width: "22rem",
                    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                  }}
                >
                  <div className="Deshborad-Group-maincontainer">
                    {loader && (
                      <Loader top={50} height={50} width={50} left={50} />
                    )}
                    {getAllGroupsStore?.length === 0 ? (
                      <p>Groups Not Available</p>
                    ) : (
                      getAllGroupsStore?.slice(0, 2).map(
                        (
                          group // Limit to only two iterations
                        ) => (
                          <div
                            className="deshbord-goup-contact-all"
                            key={group.groupId}
                          >
                            <div className="table-padding-2rem">
                              {group.groupName
                                ? group.groupName
                                : group.groupId.groupName}
                              <span className="deshbord-span-group-description">
                                <ShortText
                                  text={
                                    group.description
                                      ? group.description
                                      : group.groupId.description
                                  }
                                  maxChar={23}
                                />
                              </span>
                            </div>
                            <div className="table-padding-2rem">
                              <div className="table-padding-2rem">
                                {group.contactList.map(
                                  (contact, contactIndex) => (
                                    <li key={contactIndex}>
                                      <ShortText
                                        text={contact.firstName}
                                        maxChar={23}
                                      />
                                    </li>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* BROADCAST SECTION CODE END */}

            {/* INSTANCE SECTION CODE START */}
            <div className="item4  instance-main-class all-div-widths">
              <div className="">
                <div className="">
                  <div className="Profile-Upper-section">
                    <h4 className="Good-evening">My Instances</h4>
                  </div>
                </div>
                {/* ) : ( */}
                <p></p>
                {/* )} */}
                <div className="add-instance-div">
                  <button
                    className="Add-new-Dash-btn"
                    // onClick={handleSaveInput}
                  >
                    Add new Instance
                  </button>
                </div>

                {/* INSTANCE MAIN PAGE  */}
                <div className="instance-main-page">
                  <div
                    className="All-Instance-Card dashbord-instance-height-50"
                    style={{
                      gap: "1px",
                      paddingTop: "1rem",
                    }}
                  >
                    {/* {showLoader && ( */}
                    {instanceDataUseContext > 0 ? (
                      <Loader top={50} left={50} width={50} height={50} />
                    ) : null}
                    {/* )} */}
                    {Array.isArray(instanceDataUseContext) &&
                      instanceDataUseContext?.map((instance) => (
                        <Link
                          to={`/instancePage2/${instance?._id}`}
                          onClick={() => {
                            dispatch(setSelectedInstanceId(instance?._id));
                            console.log(
                              "Dispatched setSelectedInstanceId with ID:",
                              instance?._id
                            );
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="All-single-card Dashboard-instance-cls">
                            {instance?.keepOnlineStatus ? (
                              <>
                                <div className="live-all-badge">Live</div>
                              </>
                            ) : (
                              <>
                                <div className="red-badge">Inactive</div>
                              </>
                            )}
                            <img
                              src={
                                "https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              }
                              alt="Profile-Image"
                              className="images-allcard-style"
                              style={{ cursor: "pointer" }}
                            />
                            <div className="AllI-Rightcard-container">
                              {/* <div className="instance-id">
                                {instance?.idInstance}
                              </div>
                              <h6 className="h6-font-size">
                                {instance?.InstancesName}
                              </h6> */}
                              {/* <p>{instance?.InstancesPhone}</p> */}
                              <p>10 Days Left</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="dashbord-contact-main">
                  <h5 className="Good-evening padding-left">My Contact</h5>
                  <div className="deshbord-contact-second">
                    <div className="deshboard-single-contact">
                      <>
                        {getAllContactStore.slice(0, 6).map((allcon) => (
                          <div
                            className="deshbord-contact-profile-picture"
                            key={allcon.id}
                          >
                            <span className="centered-span">
                              <ShortText text={allcon?.firstName} maxChar={1} />
                            </span>
                            <p>{allcon?.firstName}</p>
                          </div>
                        ))}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* INSTANCE MESSAGES SECTION CODE END */}

            {/* GROUP SECTION CODE START */}
            <div className="item5 bottom-fix-height-container all-div-widths">
              <div className="Group-mian-class">
                <div className="My-group-heading">
                  <h3
                    style={{
                      textAlign: "start",
                      margin: "10px 0 10px 5px",
                      color: "#388c8c",
                      // marginBottom: "1.5rem",
                    }}
                  >
                    My Groups
                  </h3>
                  <span>
                    <FaArrowRight style={{ color: "#7E7E7E" }} />
                  </span>
                </div>
                <div
                  className="deshbord-Group-contant"
                  style={{
                    // width: "22rem",
                    padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                  }}
                >
                  <div className="Deshborad-Group-maincontainer">
                    {loader && (
                      <Loader top={50} height={50} width={50} left={50} />
                    )}
                    {getAllGroupsStore?.length === 0 ? (
                      <p>Groups Not Available</p>
                    ) : (
                      getAllGroupsStore?.slice(0, 2).map(
                        (
                          group // Limit to only two iterations
                        ) => (
                          <div
                            className="deshbord-goup-contact-all"
                            key={group.groupId}
                          >
                            <div className="table-padding-2rem">
                              {group.groupName
                                ? group.groupName
                                : group.groupId.groupName}
                              <span className="deshbord-span-group-description">
                                <ShortText
                                  text={
                                    group.description
                                      ? group.description
                                      : group.groupId.description
                                  }
                                  maxChar={23}
                                />
                              </span>
                            </div>
                            <div className="table-padding-2rem">
                              <div className="table-padding-2rem">
                                {group.contactList.map(
                                  (contact, contactIndex) => (
                                    <li key={contactIndex}>
                                      <ShortText
                                        text={contact.firstName}
                                        maxChar={23}
                                      />
                                    </li>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* GROUP SECTION CODE END */}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashBoardComponent;
