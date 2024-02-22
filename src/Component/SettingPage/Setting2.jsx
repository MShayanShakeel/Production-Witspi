import React, { useState } from "react";
import "./setting2.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faChevronDown,
  faUnlock,
  faBell,
  faFileInvoiceDollar,
  faMobileAlt,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import bgImg1 from "../../../images/bg1.jpg";
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import Headerprofile from "../Header-profile/Headerprofile";
import LaptopHeader from "../Header-profile/LaptopHeader";
import { handelUserChangePassword } from "../../helpers/PostApis/UserChangePassword";
import { useUserdetails } from "../../store/UserContext";
// import Header2 from './../header/header2';

function Setting2() {
  const isSidebarOpen = useSelector(
    (state) => state.sideBarStore.isSidebarOpen
  );

  const [isCardOpen, setIsCardOpen] = useState(true);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isSubscibeOpen, setIsSubscibeOpen] = useState(false);

  // CHANGE PASSWORD API STATES
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConform, setConformPassword] = useState("");

  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );
  const [headerShowInLaptop, setHeaderShowInLaptop] = useState(
    window.innerWidth > 500
  );
  const { userDetails, sideBarRender } = useUserdetails();
  // console.log(userDetails?.email , "userDetails1")

  const handleHeadershow = () => {
    setHeaderShowInMobile(window.innerWidth <= 500);
  };
  window.addEventListener("resize", handleHeadershow);

  const handleHeaderhide = () => {
    setHeaderShowInLaptop(window.innerWidth > 500);
  };
  window.addEventListener("resize", handleHeaderhide);

  // TOGGLES
  const toggleSubscibe = () => {
    setIsSubscibeOpen(true);
    setIsPayOpen(false);
    setIsNotifyOpen(false);
    setIsPassOpen(false);
    setIsCardOpen(false);
  };

  const togglePayCard = () => {
    setIsSubscibeOpen(false);
    setIsPayOpen(true);
    setIsNotifyOpen(false);
    setIsPassOpen(false);
    setIsCardOpen(false);
  };

  const toggleNotify = () => {
    setIsSubscibeOpen(false);
    setIsPayOpen(false);
    setIsNotifyOpen(true);
    setIsPassOpen(false);
    setIsCardOpen(false);
  };

  const togglePass = () => {
    setIsSubscibeOpen(false);
    setIsPayOpen(false);
    setIsNotifyOpen(false);
    setIsPassOpen(true);
    setIsCardOpen(false);
  };

  const toggleCard = () => {
    setIsSubscibeOpen(false);
    setIsPayOpen(false);
    setIsNotifyOpen(false);
    setIsPassOpen(false);
    setIsCardOpen(true);
  };
  return (
    <>
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
        {headerShowInMobile ? (
          <Col
            style={{ marginTop: "6vh" }}
            sm="12"
            md="7"
            lg="7"
            xl="7"
            xxl="7"
          >
            <Headerprofile />
          </Col>
        ) : (
          <p></p>
        )}
        <Row className="web_Pad mob_pad">
          {sideBarRender ? (
            <>
              <Col sm="1" lg="1" xl="1" xxl="1">
                {/* <Sidebar2 /> */}
              </Col>

              <Col sm="11" md="11" lg="11" xl="11" xxl="11">
                <div className="setting-marginright-1">
                  <div className="set-main">
                    {/* <h2 className='sett-pad-20px' style={{ color: 'white' }}>
                                    General Settings
                                </h2> */}
                    {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                    <div className="sett-pad-20px scroll-setting2">
                      <Row>
                        <Col md={12} lg={12} className="backdrop-filter">
                          <div
                            className={`main-sett-style ${
                              isCardOpen ? "card-open" : ""
                            }`}
                            onClick={toggleCard}
                          >
                            <div className="frst-div">
                              <FontAwesomeIcon
                                icon={faCog}
                                className="color-icon-white sett-icon"
                              />
                            </div>
                            <div>
                              <h6 className="color-h6-white">Account</h6>
                              <p className="color-white">Manage Your Account</p>
                            </div>
                            <div className="down-icon">
                              {isCardOpen && (
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  onClick={() => setIsCardOpen(!isCardOpen)}
                                  className="set_color_icon_white"
                                />
                              )}
                            </div>
                          </div>
                          {isCardOpen && (
                            <div className="below-container">
                              <div className="card-below-body">
                                <form>
                                  <Row>
                                    <Col xs={12} md={12} lg={6}>
                                      <div className="acc-form-input">
                                        <label className="label_white">
                                          {" "}
                                          Name{" "}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Name..."
                                          className="input-field-setting2 text-black focus:text-black"
                                        />
                                      </div>
                                    </Col>

                                    <Col xs={12} md={12} lg={6}>
                                      <div className="acc-form-input">
                                        <label className="label_white">
                                          {" "}
                                          Email{" "}
                                        </label>
                                        <input
                                          type="email"
                                          placeholder="xyz@gmail.com"
                                          className="input-field-setting2 text-black focus:text-black"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col xs={12} md={12} lg={6}>
                                      <div className="acc-form-input">
                                        <label className="label_white">
                                          {" "}
                                          City{" "}
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Karachi"
                                          className="input-field-setting2 text-black focus:text-black"
                                        />
                                      </div>
                                    </Col>

                                    <Col xs={12} md={12} lg={6}>
                                      <div className="acc-form-input">
                                        <label className="label_white">
                                          {" "}
                                          Country{" "}
                                        </label>
                                        <input
                                          type="email"
                                          placeholder="Pakistan"
                                          className="input-field-setting2 text-black focus:text-black"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <div
                                    className="btn-style-end"
                                    style={{
                                      marginRight: "11px",
                                      marginTop: "4px",
                                    }}
                                  >
                                    <Button className="Update-btn">
                                      Save Changes
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={12} className="backdrop-filter">
                          <div
                            className={`main-sett-style ${
                              isPassOpen ? "card-open" : ""
                            }`}
                            onClick={togglePass}
                          >
                            <div className="frst-div">
                              <FontAwesomeIcon
                                icon={faUnlock}
                                className="color-icon-white sett-icon"
                              />
                            </div>
                            <div>
                              <h6 className="color-h6-white">Password</h6>
                              <p className="color-white">
                                Change Your Access Password
                              </p>
                            </div>
                            <div className="down-icon">
                              {isPassOpen && (
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  className="set_color_icon_white"
                                />
                              )}
                            </div>
                          </div>
                          {isPassOpen && (
                            <div className="below-container">
                              <div className="card-below-body">
                                <form>
                                  <Row>
                                    <Col xs={12} md={12} lg={12}>
                                      <div className="acc-form-input">
                                        <label className="label_white">
                                          {" "}
                                          Current Password{" "}
                                        </label>
                                        <input
                                          type="password"
                                          placeholder="Current Password"
                                          value={currentPassword}
                                          onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                          }
                                          className="input-field-setting2 cur-pass text-black focus:text-black"
                                          style={{ width: "49%" }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <div className="acc-form-main">
                                      <Col xs={12} md={6} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            New Password{" "}
                                          </label>
                                          <input
                                            type="password"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) =>
                                              setNewPassword(e.target.value)
                                            }
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>

                                      <Col xs={12} md={6} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            Confirm Password{" "}
                                          </label>
                                          <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={newConform}
                                            onChange={(e) =>
                                              setConformPassword(e.target.value)
                                            }
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>
                                    </div>
                                  </Row>
                                  <div
                                    className="btn-style-end"
                                    style={{
                                      marginRight: "11px",
                                      marginTop: "3px",
                                    }}
                                  >
                                    <Button
                                      className="Update-btn"
                                      onClick={() =>
                                        handelUserChangePassword(
                                          userDetails,
                                          currentPassword,
                                          newPassword,
                                          newConform
                                        )
                                      }
                                    >
                                      Update Password
                                    </Button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={12} className="backdrop-filter">
                          <div
                            className={`main-sett-style ${
                              isNotifyOpen ? "card-open" : ""
                            }`}
                            onClick={toggleNotify}
                          >
                            <div className="frst-div">
                              <FontAwesomeIcon
                                icon={faBell}
                                // onClick={setIsNotifyOpen(false)}
                                className="color-icon-white sett-icon"
                              />
                            </div>
                            <div>
                              <h6 className="color-h6-white">Notification</h6>
                              <p className="color-white">
                                Manage Your Notification of account
                              </p>
                            </div>
                            <div className="down-icon">
                              {isNotifyOpen && (
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  className="set_color_icon_white"
                                />
                              )}
                            </div>
                          </div>
                          {isNotifyOpen && (
                            <div className="below-container">
                              <div className="card-below-body">
                                <p style={{ color: "#3ab19d" }}>Content here</p>
                              </div>
                            </div>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12} lg={12} className="backdrop-filter">
                          <div
                            className={`main-sett-style ${
                              isPayOpen ? "card-open" : ""
                            }`}
                            onClick={togglePayCard}
                          >
                            <div className="frst-div">
                              <FontAwesomeIcon
                                icon={faFileInvoiceDollar}
                                className="color-icon-white sett-icon"
                              />
                            </div>
                            <div>
                              <h6 className="color-h6-white">
                                Payment Cards & Billings
                              </h6>
                              <p className="color-white">
                                Manage Your Payment cards and check your account
                              </p>
                            </div>
                            <div className="down-icon">
                              {isPayOpen && (
                                <div className="invoice-Addnew-main">
                                  <Button className="invoice-btn">
                                    Invoices
                                  </Button>
                                  <Button className="Add-new-btn">
                                    Add new Card
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            {isPayOpen && (
                              <div style={{ padding: "10px" }}>
                                <form id="form-file-upload">
                                  <label
                                    id="label-file-upload2"
                                    for="input-file-upload"
                                    className="label_white"
                                  >
                                    <div>
                                      <h6>Add Card Payment</h6>
                                      <p style={{ padding: "10px 0" }}>
                                        You have no payments cards yet. Click on
                                        the button below to add the first one.
                                      </p>
                                      <Button className="Add-new-btn">
                                        Add new Card
                                      </Button>
                                    </div>
                                  </label>
                                </form>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} lg={12} className="backdrop-filter">
                          <div
                            className={`main-sett-style ${
                              isSubscibeOpen ? "card-open" : ""
                            }`}
                            onClick={toggleSubscibe}
                          >
                            <div className="frst-div">
                              <FontAwesomeIcon
                                icon={faMobileAlt}
                                className="color-icon-white sett-icon"
                              />
                            </div>
                            <div>
                              <h6 className="color-h6-white">Subscriptions</h6>
                              <p className="color-white">
                                Manage Your Monthly account subsriptions
                              </p>
                            </div>
                            <div className="down-icon">
                              {isSubscibeOpen && (
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  className="set_color_icon_white"
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            {isSubscibeOpen && (
                              <div style={{ padding: "10px" }}>
                                <form id="form-file-upload">
                                  <label
                                    id="label-file-upload2"
                                    for="input-file-upload"
                                    className="label_white"
                                  >
                                    <div>
                                      <h6>Add Card Payment For Subscription</h6>
                                      <p style={{ padding: "10px 0" }}>
                                        You have no payments cards yet. Click on
                                        the button below to add the first one.
                                      </p>
                                      <Button className="Add-new-btn">
                                        Add new Card
                                      </Button>
                                    </div>
                                  </label>
                                </form>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <p>
              <>
                <Col sm="2" lg="2" xl="2" xxl="2">
                  {/* <Sidebar2 /> */}
                </Col>

                <Col
                  sm="10"
                  md="10"
                  lg="10"
                  xl="10"
                  xxl="10"
                  style={{ float: "right" }}
                >
                  <div style={{marginRight : "1rem"}}>
                    <div className="set-main">
                      {/* <h2 className='sett-pad-20px' style={{ color: 'white' }}>
                                    General Settings
                                </h2> */}
                      {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                      <div className="sett-pad-20px scroll-setting2">
                        <Row>
                          <Col md={12} lg={12} className="backdrop-filter">
                            <div
                              className={`main-sett-style ${
                                isCardOpen ? "card-open" : ""
                              }`}
                              onClick={toggleCard}
                            >
                              <div className="frst-div">
                                <FontAwesomeIcon
                                  icon={faCog}
                                  className="color-icon-white sett-icon"
                                />
                              </div>
                              <div>
                                <h6 className="color-h6-white">Account</h6>
                                <p className="color-white">
                                  Manage Your Account
                                </p>
                              </div>
                              <div className="down-icon">
                                {isCardOpen && (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    onClick={() => setIsCardOpen(!isCardOpen)}
                                    className="set_color_icon_white"
                                  />
                                )}
                              </div>
                            </div>
                            {isCardOpen && (
                              <div className="below-container">
                                <div className="card-below-body">
                                  <form>
                                    <Row>
                                      <Col xs={12} md={12} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            Name{" "}
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Name..."
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>

                                      <Col xs={12} md={12} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            Email{" "}
                                          </label>
                                          <input
                                            type="email"
                                            placeholder="xyz@gmail.com"
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col xs={12} md={12} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            City{" "}
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="Karachi"
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>

                                      <Col xs={12} md={12} lg={6}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            Country{" "}
                                          </label>
                                          <input
                                            type="email"
                                            placeholder="Pakistan"
                                            className="input-field-setting2 text-black focus:text-black"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <div
                                      className="btn-style-end"
                                      style={{
                                        marginRight: "11px",
                                        marginTop: "4px",
                                      }}
                                    >
                                      <Button className="Update-btn">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={12} className="backdrop-filter">
                            <div
                              className={`main-sett-style ${
                                isPassOpen ? "card-open" : ""
                              }`}
                              onClick={togglePass}
                            >
                              <div className="frst-div">
                                <FontAwesomeIcon
                                  icon={faUnlock}
                                  className="color-icon-white sett-icon"
                                />
                              </div>
                              <div>
                                <h6 className="color-h6-white">Password</h6>
                                <p className="color-white">
                                  Change Your Access Password
                                </p>
                              </div>
                              <div className="down-icon">
                                {isPassOpen && (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="set_color_icon_white"
                                  />
                                )}
                              </div>
                            </div>
                            {isPassOpen && (
                              <div className="below-container">
                                <div className="card-below-body">
                                  <form>
                                    <Row>
                                      <Col xs={12} md={12} lg={12}>
                                        <div className="acc-form-input">
                                          <label className="label_white">
                                            {" "}
                                            Current Password{" "}
                                          </label>
                                          <input
                                            type="password"
                                            placeholder="Current Password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                              setCurrentPassword(e.target.value)
                                            }
                                            className="input-field-setting2 cur-pass text-black focus:text-black"
                                            style={{ width: "49%" }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <div className="acc-form-main">
                                        <Col xs={12} md={6} lg={6}>
                                          <div className="acc-form-input">
                                            <label className="label_white">
                                              {" "}
                                              New Password{" "}
                                            </label>
                                            <input
                                              type="password"
                                              placeholder="New Password"
                                              value={newPassword}
                                              onChange={(e) =>
                                                setNewPassword(e.target.value)
                                              }
                                              className="input-field-setting2 text-black focus:text-black"
                                            />
                                          </div>
                                        </Col>

                                        <Col xs={12} md={6} lg={6}>
                                          <div className="acc-form-input">
                                            <label className="label_white">
                                              {" "}
                                              Confirm Password{" "}
                                            </label>
                                            <input
                                              type="password"
                                              placeholder="Confirm Password"
                                              value={newConform}
                                              onChange={(e) =>
                                                setConformPassword(
                                                  e.target.value
                                                )
                                              }
                                              className="input-field-setting2 text-black focus:text-black"
                                            />
                                          </div>
                                        </Col>
                                      </div>
                                    </Row>
                                    <div
                                      className="btn-style-end"
                                      style={{
                                        marginRight: "11px",
                                        marginTop: "3px",
                                      }}
                                    >
                                      <Button
                                        className="Update-btn"
                                        onClick={() =>
                                          handelUserChangePassword(
                                            userDetails,
                                            currentPassword,
                                            newPassword,
                                            newConform
                                          )
                                        }
                                      >
                                        Update Password
                                      </Button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={12} className="backdrop-filter">
                            <div
                              className={`main-sett-style ${
                                isNotifyOpen ? "card-open" : ""
                              }`}
                              onClick={toggleNotify}
                            >
                              <div className="frst-div">
                                <FontAwesomeIcon
                                  icon={faBell}
                                  // onClick={setIsNotifyOpen(false)}
                                  className="color-icon-white sett-icon"
                                />
                              </div>
                              <div>
                                <h6 className="color-h6-white">Notification</h6>
                                <p className="color-white">
                                  Manage Your Notification of account
                                </p>
                              </div>
                              <div className="down-icon">
                                {isNotifyOpen && (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="set_color_icon_white"
                                  />
                                )}
                              </div>
                            </div>
                            {isNotifyOpen && (
                              <div className="below-container">
                                <div className="card-below-body">
                                  <p style={{ color: "#3ab19d" }}>
                                    Content here
                                  </p>
                                </div>
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12} lg={12} className="backdrop-filter">
                            <div
                              className={`main-sett-style ${
                                isPayOpen ? "card-open" : ""
                              }`}
                              onClick={togglePayCard}
                            >
                              <div className="frst-div">
                                <FontAwesomeIcon
                                  icon={faFileInvoiceDollar}
                                  className="color-icon-white sett-icon"
                                />
                              </div>
                              <div>
                                <h6 className="color-h6-white">
                                  Payment Cards & Billings
                                </h6>
                                <p className="color-white">
                                  Manage Your Payment cards and check your
                                  account
                                </p>
                              </div>
                              <div className="down-icon">
                                {isPayOpen && (
                                  <div className="invoice-Addnew-main">
                                    <Button className="invoice-btn">
                                      Invoices
                                    </Button>
                                    <Button className="Add-new-btn">
                                      Add new Card
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              {isPayOpen && (
                                <div style={{ padding: "10px" }}>
                                  <form id="form-file-upload">
                                    <label
                                      id="label-file-upload2"
                                      for="input-file-upload"
                                      className="label_white"
                                    >
                                      <div>
                                        <h6>Add Card Payment</h6>
                                        <p style={{ padding: "10px 0" }}>
                                          You have no payments cards yet. Click
                                          on the button below to add the first
                                          one.
                                        </p>
                                        <Button className="Add-new-btn">
                                          Add new Card
                                        </Button>
                                      </div>
                                    </label>
                                  </form>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} lg={12} className="backdrop-filter">
                            <div
                              className={`main-sett-style ${
                                isSubscibeOpen ? "card-open" : ""
                              }`}
                              onClick={toggleSubscibe}
                            >
                              <div className="frst-div">
                                <FontAwesomeIcon
                                  icon={faMobileAlt}
                                  className="color-icon-white sett-icon"
                                />
                              </div>
                              <div>
                                <h6 className="color-h6-white">
                                  Subscriptions
                                </h6>
                                <p className="color-white">
                                  Manage Your Monthly account subsriptions
                                </p>
                              </div>
                              <div className="down-icon">
                                {isSubscibeOpen && (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="set_color_icon_white"
                                  />
                                )}
                              </div>
                            </div>
                            <div>
                              {isSubscibeOpen && (
                                <div style={{ padding: "10px" }}>
                                  <form id="form-file-upload">
                                    <label
                                      id="label-file-upload2"
                                      for="input-file-upload"
                                      className="label_white"
                                    >
                                      <div>
                                        <h6>
                                          Add Card Payment For Subscription
                                        </h6>
                                        <p style={{ padding: "10px 0" }}>
                                          You have no payments cards yet. Click
                                          on the button below to add the first
                                          one.
                                        </p>
                                        <Button className="Add-new-btn">
                                          Add new Card
                                        </Button>
                                      </div>
                                    </label>
                                  </form>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            </p>
          )}
        </Row>
      </div>
    </>
  );
}

export default Setting2;
