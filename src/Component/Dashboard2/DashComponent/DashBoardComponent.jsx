import React, { useEffect, useState } from "react";
// import { Nav } from 'react-bootstrap';
// import whatsapiLogo from "../../../images/watspilogo.png";
// import defaultImg from "../../../images/default-img.png"
import defaultImg from "../../../../images/default-img.png";
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
  const { instanceDataUseContext, getAllGroupsStore } = useUserdetails();
  const [loader, setLoader] = useState(true);

  const [allGroups, setAllGroups] = useState([]);

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
  console.log(getAllGroupsStore, "getAllGroupsStore");

  return (
    <>
      <div className="grid-container">
        {/* <div className="   Graph-main-class">
          shayan
        </div> */}
        <div className="item1 Graph-main-class">
          <div>
            <div
              className="profile-messages-section"
              style={{ margin: "2rem" }}
            >
              <h6
                style={{
                  textAlign: "start",
                  margin: "10px 0 10px 5px",
                  color: "#388c8c",
                  marginBottom: "1.5rem",
                }}
              >
                Messages
              </h6>
            </div>

            <ChartPageTwo />
          </div>
        </div>

        {/* DASHBOARD MESSAGES SECTION CODE START  */}
        <div className="item2 menu-main-class">
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
                  style={{ verticalAlign: "baseline", color: "white" }}
                >
                  <div
                    className="deshbord-header-profile"
                    style={{ width: "11vh" }}
                  >
                    <img
                      src={defaultImg}
                      className="Profile-img-radius"
                      alt="Profile-Image"
                      style={{ cursor: "pointer", marginTop: "5px" }}
                    />

                    <span className="Profile-span">
                      <ShortText text={"Shayan"} maxChar={9} />
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
                    margin: "10px 0 10px 5px",
                    color: "#388c8c",
                    marginBottom: "1.5rem",
                  }}
                >
                  Messages
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* DASHBOARD MESSAGES SECTION CODE END  */}

        {/* BROADCAST MESSAGES SECTION CODE START  */}
        <div className="item3">
          <div
            style={{
              backgroundImage: `url(https://storage.googleapis.com/chatfuel-cms-staging/pic/xl_whatsapp_broadcast_complete_guide_6fd279d284/xl_whatsapp_broadcast_complete_guide_6fd279d284.png)`,
              width: "300px",
              height: "150px",
              overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "20px",
            }}
          ></div>
        </div>
        {/* DASHBOARD MESSAGES SECTION CODE END */}

        {/* INSTANCE MESSAGES SECTION CODE START */}
        <div className="item4  instance-main-class">
          <div className="">
            <div className="">
              <div className="Profile-Upper-section">
                <h4 className="Good-evening">My Instances</h4>
              </div>
            </div>
            {/* ) : ( */}
            <p></p>
            {/* )} */}
            <div>
              <button
                className="Add-new-Dash-btn"
                // onClick={handleSaveInput}
              >
                Add new Instance
              </button>
            </div>

            {/* INSTANCE MAIN PAGE  */}
            <div className="instance-main-page">
              <div className="All-Instance-Card Dashboard-instance-allinstance-cls">
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
          </div>
        </div>
        {/* INSTANCE MESSAGES SECTION CODE END */}

        {/* GROUP SECTION CODE START */}

        <div className="item5">
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
            </div>
            <div
              className="deshbord-Group-contant"
              style={{
                width: "22rem",
                overflow: "auto",
                paddingLeft: "1rem",
                height: "25vh",
              }}
            >
              <div className="groups_2_maincontainer">
                <thead style={{ marginBottom: "0", tableLayout: "fixed" }}>
                  <tr
                    style={{ background: "white" }}
                    className="head-gp-tr tr-Groups"
                  >
                    <th className="td-Sno ">No</th>
                    <th className="Group-get-table-contant table-padding-2rem">Group Name</th>
                    <th className="Group-get-table-contant">Group Members</th>
                    <th className="Group-get-table-contant">Description</th>
                    <th className="Group-get-table-contant">Status</th>
                  </tr>
                </thead>

                <table>
                  {loader && (
                    <Loader top={50} height={50} width={50} left={50} />
                  )}
                  {getAllGroupsStore?.length === 0 ? (
                    <p>Groups Not Available</p>
                  ) : (
                    getAllGroupsStore?.map((group, index) => (
                      <>
                        <tr
                          key={index}
                          style={{
                            marginBottom: "0",
                            tableLayout: "fixed",
                            color: "white",
                          }}
                        >
                          <td className="td-Sno">{index + 1}</td>
                          <td className="Group-get-table-contant">
                            {group.groupName
                              ? group?.groupName
                              : group?.groupId?.groupName}
                          </td>
                          <td className="Group-get-table-contant">
                            <div className="fixed-height-5rem">
                              {group?.contactList?.map(
                                (contact, contactIndex) => (
                                  <li key={contactIndex}>
                                    <ShortText
                                      text={contact?.firstName}
                                      maxChar={23}
                                    />
                                  </li>
                                )
                              )}
                            </div>
                          </td>
                          <td className="Group-get-table-contant">
                            <ShortText
                              text={
                                group?.description
                                  ? group?.description
                                  : group?.groupId?.description
                              }
                              maxChar={23}
                            />
                          </td>
                          <td className="Group-get-table-contant">
                            {group?.status
                              ? group?.status
                              : group?.groupId?.status}
                            <abbr
                              className="custom-tooltip"
                              title={group?.sharedID?.role}
                            >
                              {group?.sharedID?.role ? (
                                <>
                                  <IoIosCloudDone
                                    style={{
                                      marginLeft: "2rem",
                                      fontSize: "1.5rem",
                                      cursor: "pointer",
                                    }}
                                  />
                                </>
                              ) : null}
                            </abbr>
                          </td>
                        </tr>
                        <hr
                          className="saprat-line-in-gourps"
                          color="white"
                          size="4"
                        ></hr>
                      </>
                    ))
                  )}
                </table>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* GROUP SECTION CODE END */}
      </div>
    </>
  );
};
// <div className="Dashboard-Comp-card Dashboard-Comp-card-left">
//   {webViewHeaderShow ? (
//   <div className='Dashboard-display'>
//     <div>
//       <img src={whatsapiLogo}
//         alt="Profile-Image"
//         style={{ cursor: 'pointer', height: "4vh" , background: "#3AAAA9" , borderRadius: "10px"}}
//       />
//     </div>
//     <div>
//       <FontAwesomeIcon icon={faBell} style={{ fontSize: "2.5vh", color: "#3AABA7" }} />
//     </div>
//   </div>
//   ) : (
//   <p></p>
//   )
//   }
//   <ChartPageTwo />
// <DashboardInstances />
// </div>

export default DashBoardComponent;
