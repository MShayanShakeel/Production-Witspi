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
import CreateInstanceApi from "../../../helpers/PostApis/CreateInstance";
import { toast } from "react-toastify";

// import { useUserdetails } from '../../store/UserContext';
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';

// import DashboardInstances from "./../DashboardInstances/DashboardInstances";
// import whatsapiLogo from "../../../../images/watspilogo.png";
const DashBoardComponent = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
        return text.slice(0, maxChar) + "...";
      }
      return text;
    };
    const shoortedtext = shorttext(text, maxChar);

    return <div>{shoortedtext}</div>;
  };

  const MinText = ({ text, minChar }) => {
    const minimizeText = (text, minChar) => {
      if (typeof text !== "string") {
        return "";
      }
      if (text.length > minChar) {
        return text.slice(0, minChar) + "";
      }
      return text;
    };

    const minimizedText = minimizeText(text, minChar);

    return <div>{minimizedText}</div>;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 900);
    return () => clearTimeout(timer);
  });

  const [delaySendMessagesMilliseconds, setDelaySendMessagesMilliseconds] =
    useState(1000);
  const [markIncomingMessagesReaded, setMarkIncomingMessagesReaded] =
    useState(false);
  const [
    markIncomingMessagesReadedOnReply,
    setMarkIncomingMessagesReadedOnReply,
  ] = useState(false);
  const [keepOnlineStatus, setKeepOnlineStatus] = useState(true);
  const [outgoingAPIMessageWebhook, setOutgoingAPIMessageWebhook] =
    useState(true);
  const [outgoingWebhook, setOutgoingWebhook] = useState(true);
  const [deviceWebhook, setDeviceWebhook] = useState(true);
  const [stateWebhook, setStateWebhook] = useState(true);
  const [outgoingMessageWebhook, setOutgoingMessageWebhook] = useState(true);
  const [incomingWebhook, setIncomingWebhook] = useState(true);
  const [enableMessagesHistory, setEnableMessagesHistory] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    "https://mysite.com/webhook/green-api/"
  );
  //----Create Instance
  const handleSaveInput = () => {
    const randomNames = [
      "Ali",
      "Smith",
      "Johnson",
      "Brown",
      "Taylor",
      "Williams",
      "Huzaifa",
      "Saad",
      "Emma",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "Isabella",
      "Sophia",
      "Mia",
      "Charlotte",
      "Amelia",
      "Harper",
    ];

    const randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    const data = {
      webhookUrl,
      delaySendMessagesMilliseconds,
      markIncomingMessagesReaded: JSON.stringify(markIncomingMessagesReaded),
      markIncomingMessagesReadedOnReply: JSON.stringify(
        markIncomingMessagesReadedOnReply
      ),
      keepOnlineStatus: JSON.stringify(keepOnlineStatus),
      outgoingAPIMessageWebhook: JSON.stringify(outgoingAPIMessageWebhook),
      outgoingWebhook: JSON.stringify(outgoingWebhook),
      deviceWebhook: JSON.stringify(deviceWebhook),
      stateWebhook: JSON.stringify(stateWebhook),
      outgoingMessageWebhook: JSON.stringify(outgoingMessageWebhook),
      incomingWebhook: JSON.stringify(incomingWebhook),
      userId: userDetails?._id,
      InstancesName: randomName,
      InstancesPhone: +92345678910,
      enableMessagesHistory: JSON.stringify(enableMessagesHistory),
    };

    console.log(data, "datainside");

    CreateInstanceApi(data)
      .then((response) => {
        if (response?.message === "Instance Added") {
          toast.success(response?.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          console.error("API error:", response);
          toast.error(response?.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        toast.error(error?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  //----Ends Create Instance

  // const [webViewHeaderShow , setWebViewHeaderShow ] = useState (window.innerWidth >= 500);
  // const HandleShowWebHeader = () =>{
  //   setWebViewHeaderShow(window.innerWidth >= 500)
  // }
  // window.addEventListener('resize' , HandleShowWebHeader)
  console.log(getAllMessagesStore, "getAllGroupsStore");

  return (
    <>
      <Row>
        <Col md={12} lg={12} xl={12} xxl={12} style={{}}>
          <div className="grid-container">
            {/* DASHBOARD MESSAGES SECTION CODE START  */}
            <div className="item1 Graph-main-class all-div-widths">
              <>
                <div className="profile-messages-section">
                  <h4
                    style={{
                      textAlign: "start",
                      margin: "0.5rem 5px 0px 1rem",
                      color: "#388c8c",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Messages
                  </h4>
                </div>
                <div className="message-main-card">
                  <div className="message-singel-card">
                    {loader && (
                      <Loader top={50} height={50} width={50} left={50} />
                    )}
                    {getAllMessagesStore?.length === 0 ? (
                      <p>Message Not Available</p>
                    ) : (
                      getAllMessagesStore?.slice(0, 2).map((message) => (
                        <div className="single-message-contact">
                          <span
                            className="deshbord-profile-Main-digit centered-span"
                            style={{ color: "black" }}
                          >
                            <MinText text={userDetails?.name} minChar={1} />
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
                                  maxChar={94}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            </div>
            {/* DASHBOARD MESSAGES SECTION CODE END  */}

            {/* DASHBOARD GRAPH SECTION CODE START  */}
            <div className="item2 menu-main-class all-div-widths">
              <div className="row">
                <div className="profile-section col-12">
                  <div className="Profile-Upper-section">
                    <div className="Good-evening">
                      <h6 style={{ marginTop: "0.1rem" }}>Good Evening</h6>
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
                              margin: "2px 5px 0px 2px",
                              color: "#388C8C",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                        <a
                          className="dropdown-item_MainInstance"
                          onClick={handleLogout}
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
                          <MinText text={userDetails?.name} minChar={1} />
                        </span>

                        <span className="Profile-span">
                          <p
                            style={{
                              display: "flex",
                              alignItems: " center",
                              marginTop: "8px",
                              marginLeft: "5px",
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
                  <ChartPageTwo />
                </div>
              </div>
            </div>
            {/* DASHBOARD GRAPH SECTION CODE END  */}

            {/* BROADCAST SECTION CODE START  */}
            <div className="item3 broadcast-main-div-height all-div-widths">
              <div
                className="image-container"
                style={{
                  backgroundImage: `url(${BGbroadcast})`,
                  width: "100%",
                  height: "auto",
                  overflow: "hidden",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  borderRadius: "8px",
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
              <div
                className="deshbord-Group-contant"
                style={{
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
                            <ShortText
                              text={
                                group.groupName
                                  ? group.groupName
                                  : group.groupId.groupName
                              }
                              maxChar={10}
                            />
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
              {/* <div className="message-main-card">
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
                              <ShortText
                                text={
                                  group.groupName
                                    ? group.groupName
                                    : group.groupId.groupName
                                }
                                maxChar={10}
                              />
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
              </div> */}
            </div>
            {/* BROADCAST SECTION CODE END */}

            {/* INSTANCE SECTION CODE START & CONTACT*/}
            <div className="item4  instance-main-class all-div-widths">
              <div className="Deshbord-instance-main-div">
                <div className="">
                  <div className="Profile-Upper-section">
                    <h3 className="Good-evening">My Instances</h3>
                  </div>
                </div>
                <div className="add-instance-div">
                  <button
                    className="Add-new-Dash-btn"
                    onClick={handleSaveInput}
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
                          style={{
                            textDecoration: "none",
                            marginLeft: "6px",
                            marginRight: "1px",
                          }}
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
              </div>

              {/* CONTACT COMPONENT CODE START HERE */}
              <div className="dashbord-contact-main">
                <div className="My-group-heading">
                  <h3
                    style={{
                      textAlign: "start",
                      margin: "1rem 0 10px 5px",
                      color: "#388c8c",
                    }}
                  >
                    My Contacts
                  </h3>
                  <span>
                    <Link to="/myContact2">
                      <FaArrowRight style={{ color: "#7E7E7E" }} />
                    </Link>
                  </span>
                </div>
                <div className="deshbord-contact-second">
                  <div className="deshboard-single-contact">
                    <>
                      {getAllContactStore.slice(0, 8).map((allcon) => (
                        <div
                          className="deshbord-contact-profile-picture"
                          key={allcon.id}
                        >
                          <span className="centered-span">
                            <MinText text={allcon?.firstName} minChar={1} />
                          </span>
                          <p>{allcon?.firstName}</p>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              </div>
              {/* CONTACT COMPONE T CODE END HEREE */}
            </div>
            {/* INSTANCE MESSAGES & CONTACT* SECTION CODE END */}

            {/* GROUP SECTION CODE START */}
            <div className="item5 bottom-fix-height-container all-div-widths">
              <div className="Group-mian-class">
                <div className="My-group-heading">
                  <h4
                    style={{
                      textAlign: "start",
                      margin: "10px 0 10px 5px",
                      color: "#388c8c",
                    }}
                  >
                    My Groups
                  </h4>
                  <span>
                    <Link to="/Groups2">
                      <FaArrowRight style={{ color: "#7E7E7E" }} />
                    </Link>
                  </span>
                </div>
                <div
                  className="deshbord-Group-contant"
                  style={{
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
                              <ShortText
                                text={
                                  group.groupName
                                    ? group.groupName
                                    : group.groupId.groupName
                                }
                                maxChar={9}
                              />
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
                              <div
                                className="table-padding-2rem"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* {group.contactList.map(
                                  (contact, contactIndex) => (
                                    <li key={contactIndex}>
                                      <ShortText
                                        text={contact.firstName}
                                        maxChar={23}
                                      />
                                    </li>
                                    
                                    )
                                    )} */}
                                {group?.contactList.length}
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
