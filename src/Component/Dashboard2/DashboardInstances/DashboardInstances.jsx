import React, { useState, useEffect } from "react";
import "./DashboardInstances.css";
import { useSelector } from "react-redux";
import GetALLInstances from "./../../../helpers/GetApis/GetALLInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faUser,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import defaultImg from "../../../../images/default-img.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GetAllMessagesData } from "../../../helpers/GetApis/GetAllMessage";
import { useUserdetails } from "../../../store/UserContext";
import Loader from "../../../Pages/Loader";

function DashboardInstances() {
  // const userDetails = useSelector((state) => state.userInfoStore.userDetails?.userObj);
  const { userDetails } = useUserdetails();
  const userId = userDetails?._id;
  // console.log(userId, "Id1")

  // LOADER STATES
  const [loader, setLoader] = useState(true);

  //TEXT LENGTH ACCORDING to SCREEN
  const [textLength, setTextLength] = useState(50);
  const [instancesData, setInstancesData] = useState([]);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    function handleWindowResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth > 1600) {
        setTextLength(100);
      } else if (windowWidth < 1600 && windowWidth > 1000) {
        setTextLength(60);
      } else if (windowWidth > 999) {
        setTextLength(33);
      } else if (windowWidth > 400) {
        setTextLength(18);
      }
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const timmer = setTimeout(() => {
      setLoader(false);
    }, 2000);
    return () => clearTimeout(timmer);
  }, []);

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }

  // const defaultMessages = [
  //     {
  //         phoneNumber: '+09876543',
  //         timestamp: '2 Hour',
  //         text: 'Choose option 1',
  //     },
  //     {
  //         phoneNumber: '+09876543',
  //         timestamp: '3 Hour',
  //         text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
  //     },
  //     {
  //         phoneNumber: '+09876543',
  //         timestamp: '1 Hour',
  //         text: 'Choose option 2 Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet. Choose option Lorem ipsum dolor sit amet.Choose option Lorem ipsum dolor sit amet.',
  //     },
  // ];

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const msgData = await GetAllMessagesData(userId);
        if (Array.isArray(msgData?.chatHistory)) {
          setMessageData(msgData.chatHistory);
        } else {
          console.log("Invalid chatHistory format");
        }
      } catch (error) {
        console.log("Error fetching message data:", error);
      }
    };

    fetchMessageData();
  }, [userId]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const data = await GetALLInstances(userId);
  //             if (Array.isArray(data?.message)) {
  //                 setInstancesData(data.message);
  //             }
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchData();
  // }, [userId]);

  return (
    <>
      <div
        className="main-dashboard-contant"
        style={{ marginTop: "1.5vh" }}
      >
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "baseline" , marginTop: "-2rem"}}>
                    <h4 className='Dashboard-insstance-hadding' style={{ textAlign: 'start', color: "white" }}>
                        Instances
                    </h4>
                </div> */}
        {/* <a href="/instances2" style={{ textDecoration: "none" }}>
                        <h6 style={{ textAlign: 'start', color: "white", paddingRight: "10px" }}>
                            View All
                        </h6>
                    </a> */}
        {/* {instancesData && instancesData?.length > 0 ? (
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={0}
                        style={{
                            display: 'flex', justifyContent: 'space-between'
                        }}
                    >
                        {instancesData?.map((instance, index) => (
                            <SwiperSlide key={index}>
                                <div className={`Dash-card-instance ${index === instancesData.length - 1 ? 'no-margin' : ''}`}>
                                    {instance?.keepOnlineStatus ? (
                                        <>
                                            <div className="live-badge">Live</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='red-badge'>
                                                Inactive
                                            </div>
                                        </>
                                    )}
                                    <img src={"https://plus.unsplash.com/premium_photo-1661698763470-55da05629e50?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                        alt="Profile-Image"
                                        className='images-card-style'
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <div className="Dash-card-instance-container">
                                        <h6 className='h6-font-size' style={{ marginBottom: "0.2rem" }}>{instance?.InstancesName}</h6>
                                        <p>{instance?.InstancesPhone}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="color-white"></p> // Display a message when there are no instances
                )} */}
        {/* Messages */}
        <div>
          <h4
            style={{
              textAlign: "start",
              margin: "10px 0 10px 5px",
              color: "#388c8c",
            }}
          >
            Messages
          </h4>
        </div>
        {loader && <Loader top={50} left={50} width={50} height={50} />}
        <div className="Dasshboard-message-postion">
          <div className="">
            <div className="scroll-style">
              <tbody className="scrollable-body">
                <thead style={{ marginBottom: "0px", tableLayout: "fixed" }}>
                  <tr
                    className="msg-body-dash"
                    style={{ verticalAlign: "baseline", color: "#388c8c"  , boxShadow: "2px 2px lightblue"}}
                  >
                    <td
                      style={{
                        textAlign: "start",
                        minWidth: "170px",
                        marginTop: "20px",
                        paddingLeft: "4rem",
                      }}
                    >
                      Name
                    </td>
                    <td
                      style={{
                        textAlign: "start",
                        minWidth: "170px",
                        marginTop: "20px",
                        paddingLeft: "4rem",
                      }}
                    >
                      Number
                    </td>
                    <td
                      style={{
                        textAlign: "start",
                        minWidth: "170px",
                        marginTop: "20px",
                        paddingLeft: "4rem",
                      }}
                    >
                      Time Stramp
                    </td>
                    <td
                      style={{
                        textAlign: "start",
                        minWidth: "170px",
                        marginTop: "20px",
                        paddingLeft: "4rem",
                      }}
                    >
                      Message
                    </td>
                  </tr>
                </thead>

                {Array.isArray(messageData) && messageData.length > 0 ? (
                  messageData?.map((message, index) => (
                    <>
                      <tr
                        className="msg-body-dash"
                        key={index}
                        style={{ verticalAlign: "baseline", color: "black", padding : "1rem" , boxShadow: "2px 2px lightblue"}}
                      >
                        <td
                          style={{
                            textAlign: "start",
                            minWidth: "170px",
                            // marginTop: "20px",
                            padding : "0.5rem"
                          }}
                        >
                          <img
                            src={defaultImg}
                            className="Profile-img-radius"
                            alt="Profile-Image"
                            style={{ cursor: "pointer" }}
                          />
                          <span style={{ paddingLeft: "10px" }}>
                            {message?.chatId?.firstName}
                          </span>
                        </td>
                        <td style={{ minWidth: "150px" }}>
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ paddingRight: "5px" }}
                          />
                          {message?.chatId?.number}
                        </td>
                        <td style={{ minWidth: "20rem" }}>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ paddingRight: "5px", color: "#a8a9a7" }}
                          />
                          {truncateText(message?.createdAt, textLength)}
                        </td>
                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* {createTooltip(message?.message, `tooltip${index}`)} */}
                          {/* <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip id={`tooltip${index}`}>{message?.text}</Tooltip>}
                                        > */}
                          <span
                            data-tip={message?.message}
                            data-for={`tooltip${index}`}
                          >
                            {truncateText(message?.message, textLength)}
                          </span>
                          {/* </OverlayTrigger> */}
                          <span
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                          >
                            <FontAwesomeIcon
                              icon={faEllipsisV}
                              onClick={() => handleSelectMessage(message)}
                            />
                          </span>
                        </td>
                      </tr>

                      {/* <hr
                        className="saprat-line-in-gourps"
                        color="white"
                        size="0"
                      ></hr> */}
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Messagess</td>
                  </tr>
                )}
              </tbody>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardInstances;
