import React, { useEffect, useState } from "react";
import bgImg1 from "../../../images/bg1.jpg";
import { Col, Row, Modal, Button, Form, Dropdown } from "react-bootstrap";
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import Headerprofile from "../Header-profile/Headerprofile";
import { handleGetSingleGroup } from "../../helpers/GetApis/GetSingleGroupApi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Loader from "../../Pages/Loader";
import { useUserdetails } from "../../store/UserContext";
import "./GetSingleGroup.css";
import LaptopHeader from "../Header-profile/LaptopHeader";

const GetSingleGroup = () => {
  const { sideBarRender } = useUserdetails();

  const [singleGroupData, setSingleGroupData] = useState(null);
  const { group_id } = useParams();
  console.log(group_id, "group_id");

  // LOADER STATES
  const [loader, setLoader] = useState(true);
  // END LOADER STATES

  // GET GROUP AAPI START HERE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const message = await handleGetSingleGroup(group_id);
        console.log(message, "mesage");
        setSingleGroupData(message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [group_id]);

  console.log(singleGroupData, "roin");

  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );
  // Herder show in mobile view logic
  const handleShowHeader = () => {
    setHeaderShowInMobile(window.innerWidth <= 500);
  };
  window.addEventListener("resize", handleShowHeader);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
console.log(singleGroupData?.message ,"singleGroupData?.message")
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
        <Row style={{ padding: "3vh 4.5vh 3vh 0" }}>
          {sideBarRender ? (
            <>
              <Col sm="1" lg="1" xl="1" xxl="1">
                {/* <Sidebar2 /> */}
              </Col>
              <Col
                sm="10"
                md="10"
                lg="10"
                xl="10"
                xxl="10"
                style={{ width: "91%" }}
              >
                <LaptopHeader />
                <Row>
                  <Col
                    sm="12"
                    md="11"
                    lg="11"
                    xl="11"
                    xxl="11"
                    className="create_grp_filter"
                  >
                    <Row
                      className="mob-row"
                      style={{
                        marginBottom: "20px",
                        marginLeft: "10px",
                        width: "98.5%",
                      }}
                    >
                      <Col>
                        <div className="">
                          {loader && (
                            <Loader width={50} height={50} left={50} top={50} />
                          )}
                          <Link to="/groups2">
                            <IoMdArrowRoundBack
                              style={{
                                fontSize: "3vh ",
                                marginTop: "0.5rem",
                                color: "white",
                                marginBottom: "-1rem",
                                cursor: "pointer",
                              }}
                            />
                          </Link>
                          <form>
                            <div className="container">
                              <div
                                className="row textfield-row"
                                style={{ margin: "auto" }}
                              >
                                <div
                                  className="col-6 textfield-col"
                                  style={{ marginTop: "20px" }}
                                >
                                  <label className="lable-create-contact">
                                    First Name{" "}
                                  </label>
                                  <label className="contact-text-field">
                                    {singleGroupData?.message?.groupName}{" "}
                                  </label>
                                </div>

                                <div
                                  className="col-6 textfield-col"
                                  style={{ marginTop: "20px" }}
                                >
                                  <label className="lable-create-contact">
                                    Last Name{" "}
                                  </label>
                                  <label className="contact-text-field">
                                    {singleGroupData?.message?.description}{" "}
                                  </label>
                                </div>

                                <div
                                  className="col-6 textfield-col"
                                  style={{ marginTop: "20px" }}
                                >
                                  <label className="lable-create-contact">
                                    Status
                                  </label>
                                  <label className="contact-text-field">
                                    {singleGroupData?.message?.status}
                                  </label>
                                </div>

                                <div
                                  className="col-6 textfield-col"
                                  style={{ marginTop: "20px" }}
                                >
                                  <label className="lable-create-contact">
                                    Role
                                  </label>
                                  <label className="contact-text-field">
                                    {singleGroupData?.message?.status}
                                  </label>
                                </div>

                                <div
                                  className="col-12 textfield-col"
                                  style={{ marginTop: "20px" }}
                                >
                                  <label className="lable-create-contact">
                                    <h3 style={{ color: "#3AB19D" }}>
                                      Contact List
                                    </h3>
                                  </label>
                                  <label className="contact-text-field Group-contact-list-Section">
                                    {Array.isArray(
                                      singleGroupData?.message?.contactList
                                    ) &&
                                    singleGroupData?.message?.contactList
                                      .length > 0 ? (
                                      singleGroupData?.message?.contactList.map(
                                        (ListContact, index) => (
                                          <li
                                            key={index}
                                            style={{
                                              padding: "0.5rem",
                                              display: "flex",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <p
                                              style={{
                                                paddingTop: "1rem",
                                                marginRight: "1rem",
                                              }}
                                            >
                                              {ListContact.firstName}
                                            </p>
                                            <button
                                              type="button"
                                              class="btn-create-contact Group-contact-list-Section-button"
                                              //   onClick={handleComponentHidden}
                                            >
                                              Send
                                            </button>
                                          </li>
                                        )
                                      )
                                    ) : (
                                      <p>Group Contact in empty</p>
                                    )}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Col>
                    </Row>

                    {/* </Col> */}
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
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
                style={{ width: "82.3%" }}
                //  style={{float : "right" , position : "relative"}}
              >
                <LaptopHeader />
                <Row>
                  <Col
                    sm="12"
                    md="11"
                    lg="11"
                    xl="11"
                    xxl="11"
                    className="create_grp_filter"
                  >
                    <div className="">
                      {loader && (
                        <Loader width={50} height={50} left={50} top={50} />
                      )}
                      <Link to="/groups2">
                        <IoMdArrowRoundBack
                          style={{
                            fontSize: "3vh ",
                            marginTop: "0.5rem",
                            color: "white",
                            marginBottom: "-1rem",
                            cursor: "pointer",
                          }}
                        />
                      </Link>
                      <form>
                        <div className="container">
                          <div
                            className="row textfield-row"
                            style={{ margin: "auto" }}
                          >
                            <div
                              className="col-6 textfield-col"
                              style={{ marginTop: "20px" }}
                            >
                              <label className="lable-create-contact">
                                First Name{" "}
                              </label>
                              <label className="contact-text-field">
                                {singleGroupData?.message?.groupName}{" "}
                              </label>
                            </div>

                            <div
                              className="col-6 textfield-col"
                              style={{ marginTop: "20px" }}
                            >
                              <label className="lable-create-contact">
                                Last Name{" "}
                              </label>
                              <label className="contact-text-field">
                                {singleGroupData?.message?.description}{" "}
                              </label>
                            </div>

                            <div
                              className="col-6 textfield-col"
                              style={{ marginTop: "20px" }}
                            >
                              <label className="lable-create-contact">
                                Status
                              </label>
                              <label className="contact-text-field">
                                {singleGroupData?.message?.status}
                              </label>
                            </div>

                            <div
                              className="col-6 textfield-col"
                              style={{ marginTop: "20px" }}
                            >
                              <label className="lable-create-contact">
                                Role
                              </label>
                              <label className="contact-text-field">
                                {singleGroupData?.message?.status}
                              </label>
                            </div>

                            <div
                              className="col-12 textfield-col"
                              style={{ marginTop: "20px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <label className="lable-create-contact">
                                  <h3 style={{ color: "#3AB19D" }}>
                                    Contact List
                                  </h3>
                                </label>
                                {/* <label>
                                  <h4>
                                    {
                                      singleGroupData?.message?.contactList
                                        .length
                                    }
                                  </h4>
                                </label> */}
                              </div>
                              <label className="contact-text-field Group-contact-list-Section">
                                {Array.isArray(
                                  singleGroupData?.message?.contactList
                                ) &&
                                singleGroupData?.message?.contactList.length >
                                  0 ? (
                                  singleGroupData?.message?.contactList.map(
                                    (ListContact, index) => (
                                      <>
                                        <li
                                          key={index}
                                          style={{
                                            padding: "0.5rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <p
                                            style={{
                                              paddingTop: "1rem",
                                              marginRight: "1rem",
                                            }}
                                          >
                                            {ListContact.firstName}
                                          </p>

                                          <button
                                            type="button"
                                            class="btn-create-contact Group-contact-list-Section-button"
                                            //   onClick={handleComponentHidden}
                                          >
                                            Send
                                          </button>
                                        </li>

                                        <hr
                                          className="saprat-line-in-gourps"
                                          color="white"
                                          size="4"
                                        ></hr>
                                      </>
                                    )
                                  )
                                ) : (
                                  <p>Group Contact in empty</p>
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default GetSingleGroup;
