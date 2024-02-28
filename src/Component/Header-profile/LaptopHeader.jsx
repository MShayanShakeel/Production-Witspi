import React from "react";
import whatsapiLogo from "../../../images/watspilogo.png";
import defaultImg from "../../../images/default-img.png";
import { faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserdetails } from "../../store/UserContext";
import { Col, Row } from "react-bootstrap";
import "./LaptopHeader.css";

const LaptopHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const { userDetails } = useUserdetails();

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

  return (
    <>
      <Row style={{ marginTop: "1rem" }}>
        <Col sm={1}></Col>
        <Col
          md={11}
          lg={11}
          xl={12}
          xxl={12}
          className="Backdrop-myContact2-2 width_91 header-laptop-view"
          style={{ padding: "15px" }}
        >
          <div>
            <div className="MyContact_2_maincontainer">
              <div
                className="header-main-items"
                style={{ verticalAlign: "baseline", color: "white" }}
              >
              
                <img
                  src={defaultImg}
                  className="Profile-img-radius"
                  alt="Profile-Image"
                  style={{ cursor: "pointer", marginTop: "5px" }}
                />
                <span style={{ width: "6rem" }}>
                  <abbr
                    className="custom-tooltip"
                    title={userDetails?.name}
                    style={{ textDecoration: "none", color: "#388c8c" }}
                  >
                    <ShortText text={userDetails?.name} maxChar={15} />
                  </abbr>
                </span>

                <div className="header-profile"></div>
                <span
                  className="logoutbutton-and-pro"
                  style={{
                  paddingRight : "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap : "0.5rem"
                  }}
                >
                  <div className="Pro-badge">Pro</div>
                  <div className="header-ball-icon-main">
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{
                        fontSize: "3.5vh",
                        marginRight: "0.5rem",
                        color: "#388c8c",
                        cursor : "pointer",
                      }}
                    />
                  </div>
                  <a
                    style={{ color: "#388c8c" }}
                    className="dropdown-item_MainInstance"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LaptopHeader;
