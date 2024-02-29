import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faChevronDown,
  faChevronUp,
  faPencil,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"; // Import the copy icon
import "./Instance2.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import GetIndiInstance from "../../helpers/GetApis/GetIndiInstance";
import UpdateInstanceApi from "../../helpers/PostApis/UpdateIndiIntance";
import bgImg1 from "../../../images/bg1.jpg";
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import DelIndiInstance from "./../../helpers/GetApis/DelIndiInstance";
import { useUserdetails } from "../../store/UserContext";
import { handelRebortApi } from "../../helpers/GetApis/RebortApi";
import LaptopHeader from "../Header-profile/LaptopHeader";

function InstancePage2() {
  const { id } = useParams();
  console.log(id, "ss");
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(
    (state) => state.sideBarStore.isSidebarOpen
  );
  const selectedInstanceId = useSelector(
    (state) => state.userSetting.selectedInstanceId
  );
  console.log(selectedInstanceId, "asasasas");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [isBasicOpen, setIsBasicOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWebhooksOpen, setIsWebhooksOpen] = useState(false);
  const [isInputEnabled, setInputEnabled] = useState("");
  const [inputValue, setInputValue] = useState("Smith");
  const [updateInstance, setUpdateInstance] = useState("");

  const [markIncomingMessagesReaded, setMarkIncomingMessagesReaded] =
    useState("");
  const [
    markIncomingMessagesReadedOnReply,
    setMarkIncomingMessagesReadedOnReply,
  ] = useState("");
  const [keepOnlineStatus, setKeepOnlineStatus] = useState("");
  const [enableMessagesHistory, setEnableMessagesHistory] = useState("");

  const [phoneValue, setPhoneValue] = useState("");
  const [webhookUrl, setWebhookUrl] = useState(
    "https://mysite.com/webhook/green-api/"
  );
  const [webhookUrlToken, setWebhookUrlToken] = useState("");
  const [
    receivedWebhooksOnIncomingMessages,
    setReceivedWebhooksOnIncomingMessages,
  ] = useState("");
  const [outgoingAPIMessageWebhook, setOutgoingAPIMessageWebhook] =
    useState(true);
  const [outgoingWebhook, setOutgoingWebhook] = useState("");
  const [deviceWebhook, setDeviceWebhook] = useState("");
  const [stateWebhook, setStateWebhook] = useState("");
  const [outgoingMessageWebhook, setOutgoingMessageWebhook] = useState("");
  const [incomingWebhook, setIncomingWebhook] = useState("");
  const [delaySendMessagesMilliseconds, setDelaySendMessagesMilliseconds] =
    useState(1000);

  const [indiInstanceData, setIndiInstanceData] = useState(null);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { userDetails, sideBarRender } = useUserdetails();
  const userId = userDetails?.id;

  //----------ENABLE & DISABLE TEXT INPUT FIELD
  const handleEnableInput = () => {
    setInputEnabled(true);
  };
  const handleDisableInput = () => {
    setInputEnabled(false);
  };

  //-------UPDATE INSTANCE API
  const handleUpdateInput = () => {
    const data = {
      userId: userDetails?._id,
      idInstance: indiInstanceData?.idInstance,
      webhookUrl,
      webhookUrlToken,
      delaySendMessagesMilliseconds,
      markIncomingMessagesReaded:
        markIncomingMessagesReaded === ""
          ? JSON.stringify(false)
          : JSON.stringify(markIncomingMessagesReaded),
      markIncomingMessagesReadedOnReply:
        markIncomingMessagesReadedOnReply === ""
          ? JSON.stringify(false)
          : JSON.stringify(markIncomingMessagesReadedOnReply),
      keepOnlineStatus:
        keepOnlineStatus === ""
          ? JSON.stringify(false)
          : JSON.stringify(keepOnlineStatus),
      outgoingAPIMessageWebhook:
        outgoingAPIMessageWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(outgoingAPIMessageWebhook),
      outgoingWebhook:
        outgoingWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(outgoingWebhook),
      outgoingMessageWebhook:
        outgoingMessageWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(outgoingMessageWebhook),
      incomingWebhook:
        incomingWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(incomingWebhook),
      deviceWebhook:
        deviceWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(deviceWebhook),
      stateWebhook:
        stateWebhook === ""
          ? JSON.stringify(false)
          : JSON.stringify(stateWebhook),
      enableMessagesHistor:
        enableMessagesHistory === ""
          ? JSON.stringify(false)
          : JSON.stringify(enableMessagesHistory),
      InstancesPhone: phoneValue,
    };
    const test = {
      idInstance: "1101885009",
      webhookUrl: "yyy",
      webhookUrlToken: "yes",
      delaySendMessagesMilliseconds: 50,
      markIncomingMessagesReaded: "yes",
      markIncomingMessagesReadedOnReply: "yes",
      outgoingAPIMessageWebhook: "yes",
      outgoingWebhook: "yee",
      outgoingMessageWebhook: "yes",
      incomingWebhook: "yes",
      deviceWebhook: "yes",
      stateWebhook: "yes",
      keepOnlineStatus: "yes",
      InstancesPhone: "2323",
      enableMessagesHistory: "yes",
    };
    console.log(test, "test");
    console.log(data, "data");
    UpdateInstanceApi(data)
      .then((response) => {
        console.log(response.message, "response");
        if (response?.message === "Webhook Updated") {
          setUpdateInstance(response?.data);
        }
        toast.success(response?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error, "errorreps");
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

  //-----TOGGLING ALL CONTAINERS!!!
  const toggleBasic = () => {
    setIsBasicOpen(!isBasicOpen);
    // Close other sections
    setIsSettingsOpen(false);
    setIsWebhooksOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    // Close other sections
    setIsBasicOpen(false);
    setIsWebhooksOpen(false);
  };

  const toggleWebhooks = () => {
    setIsWebhooksOpen(!isWebhooksOpen);
    // Close other sections
    setIsBasicOpen(false);
    setIsSettingsOpen(false);
  };

  //-----TOGGLING ALL CONTAINERS ENDS!!!

  useEffect(() => {
    fetchIndividualInstanceData(id);
  }, [id]);
  const fetchIndividualInstanceData = async (id) => {
    try {
      const userDetails = await GetIndiInstance(id);
      if (userDetails && userDetails.message) {
        const data = userDetails.message;
        setIndiInstanceData(data);
        console.log(data?.apiTokenInstance, "ddddddd");
        // Populate form fields with fetched data
        setInputValue(data.InstancesName || "");
        setPhoneValue(data.InstancesPhone || ""); // Populate Phone field
        setKeepOnlineStatus(data.keepOnlineStatus || "");
        setStateWebhook(data.stateWebhook || "");
        setDeviceWebhook(data.deviceWebhook || "");
        setIncomingWebhook(data.incomingWebhook || "");
        setOutgoingAPIMessageWebhook(data.outgoingMessageWebhook || "");
        setOutgoingWebhook(data.outgoingWebhook || "");
        setOutgoingMessageWebhook(data.outgoingMessageWebhook || "");
        setMarkIncomingMessagesReaded(data.markIncomingMessagesReaded || "");
        setMarkIncomingMessagesReadedOnReply(
          data.markIncomingMessagesReadedOnReply || ""
        );
        setDelaySendMessagesMilliseconds(
          data.delaySendMessagesMilliseconds || ""
        );
        setWebhookUrl(data.webhookUrl || "");
        setWebhookUrlToken(data.webhookUrlToken || "");
      } else {
        console.error("No valid data found in the response:", userDetails);
      }
    } catch (error) {
      console.error("Error fetching individual instance data:", error);
    }
  };

  //-----DELETE INSTANCE
  const deleteInstance = async () => {
    try {
      // console.log('Before deleting the instance');

      // Make the API call to delete the instance
      await DelIndiInstance(id);

      // console.log('Instance deleted successfully');

      setShowDelModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/instances2");
      }, 5000);
    } catch (error) {
      console.error("Error deleting instance:", error);
      toast.error("Instance deleted UnSuccessfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleCloseModal = () => {
    setShowDelModal(false);
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  console.log(indiInstanceData, "asd");
  return (
    <>
      <ToastContainer />
      {/* Del Modal */}
      <Modal show={showDelModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Instance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the selected instance?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteInstance();
            }}
          >
            Delete
          </Button>
          <Button variant="light" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Instance deleted successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          backgroundImage: `url(${bgImg1})`,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Row className="instance-update-page-main-row">
          {sideBarRender ? (
            <>
              <Col sm="1" lg="1" xl="1" xxl="1">
                {/* <Sidebar2 /> */}
              </Col>
              <Col sm="12" md="7" lg="7" xl="7" xxl="7">
                <div className="Dashboard-Comp-card_instancePage">
                  <div style={{ width: "98%", marginLeft: "0.6rem" }}>
                    <LaptopHeader />
                  </div>
                  <div className="Dashboard-display" style={{ padding: 0 }}>
                    <Row className="row-instance row-instance-2">
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div className="card-drop-style" onClick={toggleBasic}>
                          <h6 className="clr_white_pd">Basic Info</h6>
                          <FontAwesomeIcon
                            icon={isBasicOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white "
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isBasicOpen && (
                          <form>
                            <Row>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Name{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Name..."
                                      className={`input-instance-new ${
                                        isInputEnabled ? "" : "disabled"
                                      }`}
                                      value={inputValue}
                                      onChange={(e) =>
                                        setInputValue(e.target.value)
                                      }
                                      disabled={!isInputEnabled}
                                    />
                                    {!isInputEnabled && (
                                      <FontAwesomeIcon
                                        icon={faPencil}
                                        className="left-input-new-copy left-copy-mob"
                                        onClick={handleEnableInput}
                                      />
                                    )}
                                    {isInputEnabled && (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        className="left-input-new-copy left-copy-mob"
                                        onClick={handleDisableInput}
                                        style={{ color: "#3ab19d" }}
                                      />
                                    )}
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    Phone
                                  </label>
                                  <input
                                    type="tel"
                                    placeholder="+90123456"
                                    className="input-instance-new"
                                    value={phoneValue}
                                    onChange={(e) =>
                                      setPhoneValue(e.target.value)
                                    }
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    API URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Api Url"
                                      className="input-instance-new"
                                      // defaultValue="www.afomedia.com"
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="left-input-new-copy left-copy-mob"
                                    />
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Media URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="URL"
                                      className="input-instance-new"
                                      defaultValue="www.afomedia.com"
                                    />
                                    {/* <FontAwesomeIcon
                                  icon={faCopy}
                                  className="right-input-new-copy"
                                /> */}
                                  </span>
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Instance ID{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Instance ID"
                                      className="input-instance-new"
                                      value={indiInstanceData?.idInstance}
                                      disabled
                                    />
                                    {/* <FontAwesomeIcon icon={faCopy} className="left-input-new-copy left-copy-mob" /> */}
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Instance Token{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="token"
                                      className="input-instance-new"
                                      value={indiInstanceData?.apiTokenInstance}
                                      disabled
                                    />
                                    {/* <FontAwesomeIcon icon={faCopy} className="right-input-new-copy" /> */}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </form>
                        )}
                      </Col>
                      {/* Settings */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div
                          className="card-drop-style"
                          onClick={toggleSettings}
                        >
                          <h6 className="clr_white_pd">Settings</h6>
                          <FontAwesomeIcon
                            icon={isSettingsOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isSettingsOpen && (
                          <tbody>
                            <tr>
                              <td
                                className="label-txt-start clr1_white"
                                style={{ width: "50%" }}
                              >
                                Making Incoming messages read
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={markIncomingMessagesReaded}
                                    onChange={() =>
                                      setMarkIncomingMessagesReaded(
                                        !markIncomingMessagesReaded
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Making Incoming messages read on replay
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={markIncomingMessagesReadedOnReply}
                                    onChange={() =>
                                      setMarkIncomingMessagesReadedOnReply(
                                        !markIncomingMessagesReadedOnReply
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                SendMessages delay
                              </td>
                              <td className="td-fl-end">
                                <input
                                  type="text"
                                  className="input_field-Prof IFP-msec"
                                  value={delaySendMessagesMilliseconds}
                                  onChange={(e) =>
                                    setDelaySendMessagesMilliseconds(
                                      e.target.value
                                    )
                                  }
                                  style={{
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                    color: "red",
                                  }}
                                />
                                <button className="msec-btn">ms</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Keep online status
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={keepOnlineStatus}
                                    onChange={() =>
                                      setKeepOnlineStatus(!keepOnlineStatus)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Enable History
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  {" "}
                                  {/* shayan */}
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={enableMessagesHistory}
                                    onChange={() =>
                                      setEnableMessagesHistory(
                                        !enableMessagesHistory
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </Col>
                      {/* Webhooks */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div
                          className="card-drop-style"
                          onClick={toggleWebhooks}
                        >
                          <h6 className="clr_white_pd">Webhooks</h6>
                          <FontAwesomeIcon
                            icon={isWebhooksOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isWebhooksOpen && (
                          <>
                            <Row>
                              <Col xs={12} md={12} lg={12}>
                                <div
                                  className="instance-form-input"
                                  style={{ padding: "5px 0" }}
                                >
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Webhook URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Webhook URL..."
                                      className="input-instance-new"
                                      value={webhookUrl}
                                      onChange={(e) =>
                                        setWebhookUrl(e.target.value)
                                      }
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="right-input-new-copy left-copy-wb-mob"
                                    />
                                  </span>
                                </div>
                              </Col>
                              <Col xs={12} md={12} lg={12}>
                                <div
                                  className="instance-form-input"
                                  style={{ padding: "5px 0" }}
                                >
                                  <label className="label-txt-start clr1_white">
                                    Webhook Url Token{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Webhook Url Token..."
                                      className="input-instance-new"
                                      // value={webhookUrlToken}
                                      // onChange={(e) => setWebhookUrlToken(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="right-input-new-copy right-wb-mob"
                                    />
                                  </span>
                                </div>
                                <div>
                                  <tbody style={{ width: "100%" }}>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Recieved webhooks on Incoming messages
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="flexSwitchCheckChecked"
                                            defaultChecked
                                            checked={
                                              receivedWebhooksOnIncomingMessages
                                            }
                                            onChange={() =>
                                              setReceivedWebhooksOnIncomingMessages(
                                                !receivedWebhooksOnIncomingMessages
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Outgoing API Message Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            defaultChecked
                                            checked={outgoingAPIMessageWebhook}
                                            onChange={() =>
                                              setOutgoingAPIMessageWebhook(
                                                !outgoingAPIMessageWebhook
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Outgoing Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            defaultChecked
                                            checked={outgoingWebhook}
                                            onChange={() =>
                                              setOutgoingWebhook(
                                                !outgoingWebhook
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Device Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={deviceWebhook}
                                            onChange={() =>
                                              setDeviceWebhook(!deviceWebhook)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        State Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={stateWebhook}
                                            onChange={() =>
                                              setStateWebhook(!stateWebhook)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <div style={{ display: "flex" , justifyContent : "end"}}>
                                    <Button
                                      className="save-btn"
                                      onClick={handleUpdateInput}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm="3" md="4" lg="4" xl="4" xxl="4">
                <div
                  className="Dashboard-Comp-card"
                  style={{ marginTop: "2.3vh" }}
                >
                  <div className="Dashboard-display">
                    <div>
                      <button className="btn_3" onClick={handleLogout}>
                        Logout
                      </button>
                      <button
                        className="btn_3"
                        onClick={() => handelRebortApi(indiInstanceData)}
                      >
                        Reboot
                      </button>
                      <button
                        className="btn_3"
                        onClick={() => {
                          setShowDelModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div>10 Days Left</div>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col sm="2" lg="2" xl="2" xxl="2">
                {/* <Sidebar2 /> */}
              </Col>
              <Col sm="12" md="7" lg="7" xl="7" xxl="7">
                <div className="Dashboard-Comp-card_instancePage">
                  <div style={{ width: "98%", marginLeft: "0.6rem" }}>
                    <LaptopHeader />
                  </div>
                  <div className="Dashboard-display" style={{ padding: 0 }}>
                    <Row className="row-instance row-instance-2">
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div className="card-drop-style" onClick={toggleBasic}>
                          <h6 className="clr_white_pd">Basic Info</h6>
                          <FontAwesomeIcon
                            icon={isBasicOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white "
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isBasicOpen && (
                          <form>
                            <Row>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Name{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Name..."
                                      className={`input-instance-new ${
                                        isInputEnabled ? "" : "disabled"
                                      }`}
                                      value={inputValue}
                                      onChange={(e) =>
                                        setInputValue(e.target.value)
                                      }
                                      disabled={!isInputEnabled}
                                    />
                                    {!isInputEnabled && (
                                      <FontAwesomeIcon
                                        icon={faPencil}
                                        className="left-input-new-copy left-copy-mob"
                                        onClick={handleEnableInput}
                                      />
                                    )}
                                    {isInputEnabled && (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        className="left-input-new-copy left-copy-mob"
                                        onClick={handleDisableInput}
                                        style={{ color: "#3ab19d" }}
                                      />
                                    )}
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white" >
                                    {" "}
                                    Phone{" "}
                                  </label>
                                  <input
                                    type="tel"
                                    placeholder="+90123456"
                                    className="input-instance-new"
                                    value={phoneValue}
                                    onChange={(e) =>
                                      setPhoneValue(e.target.value)
                                    }
                                  />
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    API URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Api Url"
                                      className="input-instance-new"
                                      // defaultValue="www.afomedia.com"
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="left-input-new-copy left-copy-mob"
                                    />
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Media URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="URL"
                                      className="input-instance-new"
                                      defaultValue="www.afomedia.com"
                                    />
                                    {/* <FontAwesomeIcon
                                    icon={faCopy}
                                    className="right-input-new-copy"
                                  /> */}
                                  </span>
                                </div>
                              </Col>
                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Instance ID{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Instance ID"
                                      className="input-instance-new"
                                      value={indiInstanceData?.idInstance}
                                      disabled
                                    />
                                    {/* <FontAwesomeIcon icon={faCopy} className="left-input-new-copy left-copy-mob" /> */}
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={6} lg={6}>
                                <div className="instance-form-input">
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Instance Token{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="token"
                                      className="input-instance-new"
                                      value={indiInstanceData?.apiTokenInstance}
                                      disabled
                                    />
                                    {/* <FontAwesomeIcon icon={faCopy} className="right-input-new-copy" /> */}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </form>
                        )}
                      </Col>
                      {/* Settings */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div
                          className="card-drop-style"
                          onClick={toggleSettings}
                        >
                          <h6 className="clr_white_pd">Settings</h6>
                          <FontAwesomeIcon
                            icon={isSettingsOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isSettingsOpen && (
                          <tbody>
                            <tr>
                              <td
                                className="label-txt-start clr1_white"
                                style={{ width: "50%" }}
                              >
                                Making Incoming messages read
                              </td>
                                
                              <td className="td-fl-end">
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={markIncomingMessagesReaded}
                                    onChange={() =>
                                      setMarkIncomingMessagesReaded(
                                        !markIncomingMessagesReaded
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Making Incoming messages read on replay
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={markIncomingMessagesReadedOnReply}
                                    onChange={() =>
                                      setMarkIncomingMessagesReadedOnReply(
                                        !markIncomingMessagesReadedOnReply
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                SendMessages delay
                              </td>
                              <td className="td-fl-end">
                                <input
                                  type="text"
                                  className="input_field-Prof IFP-msec"
                                  value={delaySendMessagesMilliseconds}
                                  onChange={(e) =>
                                    setDelaySendMessagesMilliseconds(
                                      e.target.value
                                    )
                                  }
                                  style={{
                                    borderTopRightRadius: "0",
                                    borderBottomRightRadius: "0",
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                    color: "red",
                                  }}
                                />
                                <button className="msec-btn">ms</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Keep online status
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={keepOnlineStatus}
                                    onChange={() =>
                                      setKeepOnlineStatus(!keepOnlineStatus)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="label-txt-start clr1_white">
                                Enable History
                              </td>
                              <td className="td-fl-end">
                                <div className="form-check form-switch custom-switch">
                                  {" "}
                                  {/* shayan */}
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckDefault"
                                    checked={enableMessagesHistory}
                                    onChange={() =>
                                      setEnableMessagesHistory(
                                        !enableMessagesHistory
                                      )
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </Col>
                      {/* Webhooks */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="backdropfilter_InstancePage"
                      >
                        <div
                          className="card-drop-style"
                          onClick={toggleWebhooks}
                        >
                          <h6 className="clr_white_pd">Webhooks</h6>
                          <FontAwesomeIcon
                            icon={isWebhooksOpen ? faChevronUp : faChevronDown} // Arrow icon for toggle
                            className="arrow-icon clr1_white"
                            style={{ marginRight: "10px" }}
                          />
                        </div>
                        {isWebhooksOpen && (
                          <>
                            <Row>
                              <Col xs={12} md={12} lg={12}>
                                <div
                                  className="instance-form-input"
                                  style={{ padding: "5px 0" }}
                                >
                                  <label className="label-txt-start clr1_white">
                                    {" "}
                                    Webhook URL{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Webhook URL..."
                                      className="input-instance-new"
                                      value={webhookUrl}
                                      onChange={(e) =>
                                        setWebhookUrl(e.target.value)
                                      }
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="right-input-new-copy left-copy-wb-mob"
                                    />
                                  </span>
                                </div>
                              </Col>
                              <Col xs={12} md={12} lg={12}>
                                <div
                                  className="instance-form-input"
                                  style={{ padding: "5px 0" }}
                                >
                                  <label className="label-txt-start clr1_white">
                                    Webhook Url Token{" "}
                                  </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Webhook Url Token..."
                                      className="input-instance-new"
                                      // value={webhookUrlToken}
                                      // onChange={(e) => setWebhookUrlToken(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="right-input-new-copy right-wb-mob"
                                    />
                                  </span>
                                </div>
                                <div>
                                  <tbody style={{ width: "100%" }}>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Recieved webhooks on Incoming messages
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="flexSwitchCheckChecked"
                                            defaultChecked
                                            checked={
                                              receivedWebhooksOnIncomingMessages
                                            }
                                            onChange={() =>
                                              setReceivedWebhooksOnIncomingMessages(
                                                !receivedWebhooksOnIncomingMessages
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Outgoing API Message Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            defaultChecked
                                            checked={outgoingAPIMessageWebhook}
                                            onChange={() =>
                                              setOutgoingAPIMessageWebhook(
                                                !outgoingAPIMessageWebhook
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Outgoing Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            defaultChecked
                                            checked={outgoingWebhook}
                                            onChange={() =>
                                              setOutgoingWebhook(
                                                !outgoingWebhook
                                              )
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        Device Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={deviceWebhook}
                                            onChange={() =>
                                              setDeviceWebhook(!deviceWebhook)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="label-txt-start clr1_white">
                                        State Webhook
                                      </td>
                                      <td className="td-fl-end">
                                        <div className="form-check form-switch custom-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={stateWebhook}
                                            onChange={() =>
                                              setStateWebhook(!stateWebhook)
                                            }
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <div style={{ display: "flex" , justifyContent : "end" }}>
                                    <Button
                                      className="save-btn"
                                      onClick={handleUpdateInput}
                                    >
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm="3" md="3" lg="3" xl="3" xxl="3">
                <div
                  className="Dashboard-Comp-card"
                  style={{ marginTop: "2.3vh" }}
                >
                  <div className="Dashboard-display">
                    <div>
                      <button className="btn_3" onClick={handleLogout}>
                        Logout
                      </button>
                      <button
                        className="btn_3"
                        onClick={() => handelRebortApi(indiInstanceData)}
                      >
                        Reboot
                      </button>
                      <button
                        className="btn_3"
                        onClick={() => {
                          setShowDelModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div>10 Days Left</div>
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default InstancePage2;
