import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import bgImg1 from "../../../images/bg1.jpg";
import "./createGroup2.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { UserHeader } from "../../helpers/Userheader";
import { decryption, encryption } from "../../helpers/encryptionDecryption";
import { toast } from "react-toastify";
import { useUserdetails } from "../../store/UserContext";
import LaptopHeader from "../Header-profile/LaptopHeader";

function CreateGroup2() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [getuserId, setGetUserId] = useState([]);

  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [contactList, setContactList] = useState([]);

  // const handleSingleCheckboxChange = (rowId) => {
  //   setSelectedRows(prevState => ({
  //     ...prevState,
  //     [rowId]: !prevState[rowId] // Toggle the checkbox state for the clicked row
  //   }));
  // };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll); // Toggle the "Select All" state
    const newSelectedRows = {}; // Object to store selected rows
    if (!selectAll) {
      // If "Select All" is checked, select all rows
      contactList.forEach((row) => {
        newSelectedRows[row._id] = true;
      });
    }
    setSelectedRows(newSelectedRows); // Update the selected rows state
  };

  const handleSingleCheckboxChange = (rowId) => {
    setSelectedRows((prevState) => {
      const updatedSelectedRows = { ...prevState };


      updatedSelectedRows[rowId] = !updatedSelectedRows[rowId];

      if (!updatedSelectedRows[rowId]) {
        delete updatedSelectedRows[rowId];
      }

      return updatedSelectedRows;
    });
  };
  const selectedIds = Object.keys(selectedRows);

  console.log(selectedIds, "shayahsfkjasshfass");
  // console.log(selectedRows, "selectedRows");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    gender: "",
    email: "",
    country: "",
    age: "",
  });

  const { userDetails, sideBarRender } = useUserdetails();
  const userId = userDetails?._id;
  console.log(userDetails, "userdetails");

  //START GET ALL CONTACT API

  useEffect(() => {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getAllContacts/${userDetails?._id}`;
    if (userDetails?._id) {
      axios
        .get(url, {
          headers: UserHeader,
        })
        .then((response) => {
          console.log(response, "response");
          const resData = decryption(response?.data?.data);
          setContactList(resData?.message);
          console.log(resData, "resDAtadata");
        })
        .catch((error) => {
          console.error(
            "Error fetching data at GetAllContacts:",
            decryption(error.response.data.data),
            console.log(error, "arror")
          );
        });
    }
  }, [userDetails]);

  //END GET ALL CONTACT

  //START CREATE GROUP

  const handleCreateGroup = async (id) => {
    if (!groupName || !contactList || !groupDescription) {
      console.log("some things are missing");
      return;
    }
    const data = {
      userId: userId,
      groupName: groupName,
      // contactId: contactList?.map((contactList) => contactList?._id),
      contactId: selectedIds,
      description: groupDescription,
      groupOwner: userId,
      status: true,
    };
    console.log(data, "data");

    // console.log(data, "datadata");
    const encrypted = encryption(data);
    // console.log(contactList?.map((contactList) => contactList?._id) , "pop")

    try {
      axios
        .post(
          "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createGroup",
          { data: encrypted },
          {
            headers: UserHeader,
            params: { id: id.id },
          }
        )
        .then((res) => {
          console.log(decryption(res.data.data)),
            toast.success("Create Group Sucessfuly");
          console.log(userDetails._id, "userdetail");
          console.log(res, "resresres");
          setGroupName(""), setGroupDescription("");
        })
        .catch((err) => {
          const decriptionerr = decryption(err.response.data.data);
          toast.error(decryption(err.response.data.data));
          alert(decriptionerr?.message, "ok");
          console.log(userDetails._id, "userdetail");
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userId, "userId");

  const [textLength, setTextLength] = useState(100);
  useEffect(() => {
    function handleWindowResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth > 1600) {
        setTextLength(150);
      } else if (windowWidth < 1600 && windowWidth > 1000) {
        setTextLength(100);
      } else if (windowWidth > 999) {
        setTextLength(50);
      } else if (windowWidth > 400) {
        setTextLength(20);
      }
    }
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
  // const handleSelectAllChange = () => {
  //   setSelectAll(!selectAll); // Toggle the "Select All" state
  // };
  const handleCheckboxChange = () => {
    // For Individual checkbox, in Futher
  };

  // Function to handle changes in the input fields
  // const handleInputChange = (event) => {
  //     const { groupName, value } = event.target;
  //     // Update the corresponding state variable
  //     if (groupName === 'name') {
  //         setName(value);
  //     } else if (groupName === 'description') {
  //         setDescription(value);
  //     }
  // };

  // Check if all required fields are filled if not (HIDE BTN)
  const isSaveButtonVisible = groupName !== "" && groupDescription !== "";
  // (selectAll);

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
                        <div className="card-drop-style">
                          <h1
                            style={{
                              padding: "10px",
                              paddingTop: "20px",
                              fontWeight: "600",
                              color: "#388C8C",
                            }}
                          >
                            Create Groups
                          </h1>
                          {isSaveButtonVisible && (
                            <button
                              type="button"
                              className="myexecl-btn_creategrp2 Save-CG-btn"
                              onClick={handleCreateGroup}
                            >
                              Save
                            </button>
                          )}
                        </div>
                        <Col xs={12} md={12} lg={12} className="cr-display">
                          <div
                            className="instance-form-input_grp2"
                            style={{ paddingRight: "10px" }}
                          >
                            <label style={{ color: "white" }}> Name </label>
                            <span>
                              <input
                                type="text"
                                placeholder="Name..."
                                className="input-instance_grp2 focus:text-black"
                                name="name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                              />
                            </span>
                          </div>
                          <div className="instance-form-input_grp2">
                            <label style={{ color: "white" }}>
                              {" "}
                              Description{" "}
                            </label>
                            <input
                              type="text"
                              placeholder="Description..."
                              className="input-instance_grp2 focus:text-black"
                              name="description"
                              value={groupDescription}
                              onChange={(e) =>
                                setGroupDescription(e.target.value)
                              }
                            />
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <div>
                      <div className="MyContact_2_maincontainer">
                        <thead
                          style={{ marginBottom: "0", tableLayout: "fixed" }}
                        >
                          <tr
                            style={{ color: "white" }}
                            className="th-font-style"
                          >
                            <th className="th-checkbox">
                              <input
                                type="checkbox"
                                onClick={setGetUserId}
                                // onChange={handleSelectAllChange}
                                // checked={selectAll}
                              />
                            </th>
                            <th className="td_min_sNo_width">S.N</th>
                            <th className="td_min_width">First Name</th>
                            <th className="td_min_width">Last Name</th>
                            <th className="td_min_width">Email</th>
                            <th className="td_min_width">Phone</th>
                            <th className="td_min_width">Gender</th>
                            <th className="td_min_width">Age</th>
                            <th className="td_min_width">Country</th>
                          </tr>
                        </thead>

                        {/* <div className="MyContact_2_container"> */}
                        {contactList?.length < 0 ? (
                          <p>No data found</p>
                        ) : (
                          contactList?.map((row, index) => (
                            <table>
                              <tbody
                                className="tbody-font-style"
                                style={{
                                  marginBottom: "0",
                                  tableLayout: "absolute",
                                  color: "white",
                                }}
                              >
                                <td key={row._id}>
                                  <td className="th-checkbox">
                                    <input
                                      type="checkbox"
                                      onClick={setGetUserId}
                                      // onChange={handleSelectAllChange}
                                      // checked={selectAll}
                                    />
                                  </td>
                                  <td className="td_min_sNo_width">
                                    {index + 1}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.firstName}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.lastName || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.email || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.number}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.gender || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.age || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.country || ""}
                                  </td>
                                </td>
                              </tbody>
                            </table>
                            // ))
                          ))
                        )}
                        {/* </div> */}
                      </div>
                    </div>
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
                    <Row
                      className="mob-row"
                      style={{
                        marginBottom: "20px",
                        marginLeft: "10px",
                        width: "98.5%",
                      }}
                    >
                      <Col>
                        <div className="card-drop-style">
                          <h1
                            style={{
                              padding: "10px",
                              paddingTop: "20px",
                              fontWeight: "600",
                              color: "#388C8C",
                            }}
                          >
                            Create Groups
                          </h1>
                          {isSaveButtonVisible && (
                            <button
                              type="button"
                              className="myexecl-btn_creategrp2 Save-CG-btn"
                              onClick={handleCreateGroup}
                            >
                              Save
                            </button>
                          )}
                        </div>
                        <Col xs={12} md={12} lg={12} className="cr-display">
                          <div
                            className="instance-form-input_grp2"
                            style={{ paddingRight: "10px" }}
                          >
                            <label style={{ color: "white" }}> Name </label>
                            <span>
                              <input
                                type="text"
                                placeholder="Name..."
                                className="input-instance_grp2 focus:text-black"
                                name="name"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                              />
                            </span>
                          </div>
                          <div className="instance-form-input_grp2">
                            <label style={{ color: "white" }}>
                              {" "}
                              Description{" "}
                            </label>
                            <input
                              type="text"
                              placeholder="Description..."
                              className="input-instance_grp2 focus:text-black"
                              name="description"
                              value={groupDescription}
                              onChange={(e) =>
                                setGroupDescription(e.target.value)
                              }
                            />
                          </div>
                        </Col>
                      </Col>
                    </Row>

                    <div>
                      <div className="MyContact_2_maincontainer">
                        <thead
                          style={{
                            marginBottom: "0",
                            tableLayout: "fixed",
                            background: "white",
                          }}
                        >
                          <tr
                            style={{ color: "white" }}
                            className="th-font-style"
                          >
                            <th className="th-checkbox">
                              {/* <input
                                type="checkbox"
                                onClick={setGetUserId}
                                // onChange={handleSelectAllChange}
                                // checked={selectAll}
                              /> */}
                            </th>
                            <th className="td_min_sNo_width">S.N</th>
                            <th className="td_min_width">First Name</th>
                            <th className="td_min_width">Last Name</th>
                            <th className="td_min_width">Email</th>
                            <th className="td_min_width">Phone</th>
                            <th className="td_min_width">Gender</th>
                            <th className="td_min_width">Age</th>
                            <th className="td_min_width">Country</th>
                          </tr>
                        </thead>

                        {/* <div className="MyContact_2_container"> */}
                        {contactList?.length < 0 ? (
                          <p>No data found</p>
                        ) : (
                          contactList?.map((row, index) => (
                            <table style={{ marginTop: "1rem" }}>
                              <tbody
                                className="tbody-font-style"
                                style={{
                                  marginBottom: "0",
                                  tableLayout: "absolute",
                                  color: "white",
                                }}
                              >
                                <td key={row._id}>
                                  <td className="th-checkbox">
                                    <input
                                      type="checkbox"
                                      onClick={() => setGetUserId(row?._id)}
                                      onChange={() => {
                                        handleSingleCheckboxChange(row._id);
                                      }}
                                      checked={selectedRows[row._id] || false}
                                    />
                                    {console.log(getuserId, "anrow")}
                                  </td>
                                  <td className="td_min_sNo_width">
                                    {index + 1}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.firstName}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.lastName || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.email || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.number}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.gender || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.age || ""}
                                  </td>
                                  <td className="td_min_width">
                                    {row?.country || ""}
                                  </td>
                                </td>
                              </tbody>
                              <hr
                                className="saprat-line-in-gourps"
                                color="white"
                                size="1"
                              ></hr>
                            </table>
                            // ))
                          ))
                        )}
                        {/* </div> */}
                      </div>
                    </div>
                    {/* </Col> */}
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default CreateGroup2;
