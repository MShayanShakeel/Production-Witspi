import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Button, Form, Dropdown } from "react-bootstrap";
import "./groups2.css";
import { IoIosCloudDone } from "react-icons/io";
import Autosuggest from "react-autosuggest";
import { FaSearch } from "react-icons/fa";
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import bgImg1 from "../../../images/bg1.jpg";
import { GrView } from "react-icons/gr";
import GetAllGroupsApi from "../../helpers/GetApis/GetAllGroups";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faPaperclip,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateGroupApi from "../../helpers/PostApis/UpdateGroup";
import { useUserdetails } from "../../store/UserContext";
import axios from "axios";
import { UserHeader } from "../../helpers/Userheader";
import { decryption } from "../../helpers/encryptionDecryption";
import { handleShareGroup } from "../../helpers/PostApis/ShareGroupApi";
import { HandleSearchEmailShareGroup } from "../../helpers/GetApis/SearchEmail";
import Headerprofile from "../Header-profile/Headerprofile";
import { faSlideshare } from "@fortawesome/free-brands-svg-icons";
import { RiMessage2Fill } from "react-icons/ri";
import { handleSendMessageInstance } from "../../helpers/PostApis copy/PostApis/SendMessageInstance";
import { handleSendMessageForGroup } from "../../helpers/PostApis copy/PostApis/SendMsgForGroup";
import { handleGetAllGroups } from "../../helpers/GetApis/GetShareAllGroups";
import { Link } from "react-router-dom";
import { handleGetSingleGroup } from "../../helpers/GetApis/GetSingleGroupApi";
import Loader from "../../Pages/Loader";
import LaptopHeader from "../Header-profile/LaptopHeader";
import handleDeleteGroup from "../../helpers/GetApis/DelGroup";

// ... rest of your code

// console.log(emailAddresses , "emailAddresses")

function Groups2() {
  const navigate = useNavigate();
  const [allGroups, setAllGroups] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchEmailModel, setsearchEmailModel] = useState(false);
  const [emailSearch, setEmailSearch] = useState(null);
  const [groupsIdToDelete, setGroupsIdToDelete] = useState(null);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [updateGroup, setUpdateGroup] = useState([]);
  const [emailFind, setEmailFind] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedRole, setSelectedRole] = useState("user");
  const [apiResponce, setApiResponce] = useState({});
  const [emailAddresses, setEmailAddresses] = useState([]);
  // const [groupShareIconsUser, setGroupShareIconsUser] = useState(false);

  const [showSendMessageModal, setShowSendMessageModal] = useState(false);

  // SEND MESSAGE API STATES
  const [sendMessageInstance, setSendMessageInstance] = useState("");
  const [instanseId, setInstanceId] = useState("");

  // SHARE GORUP DATA STORE STARE
  const [shareGroupDataStore, setShareGroupDataStore] = useState("");

  //END SEND MESSAGE API STATES

  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );

  const [headerShowInLaptop, setHeaderShowInLaptop] = useState(
    window.innerWidth > 500
  );

  //  LOADER STATES
  const [loader, setLoader] = useState(true);

  // FATCH GROUP ID WHEN CLICK ON GROUP ICCON
  const [fatchGroupId, setFatchGroupId] = useState("");
  // FATCH GROUP ID WHEN CLICK ON GROUP ICCON

  const { userDetails, instanceDataUseContext, sideBarRender } =
    useUserdetails();
  const [selectedGroup, setSelectedGroup] = useState({});
  const userId = userDetails?._id;

  const [formData, setFormData] = useState({
    groupName: "",
    contactList: "",
    status: "",
    description: "",
  });

  // Herder show in mobile view logic
  const handleShowHeader = () => {
    setHeaderShowInMobile(window.innerWidth <= 500);
  };
  window.addEventListener("resize", handleShowHeader);

  const handlehidehadder = () => {
    setHeaderShowInLaptop(window.innerWidth > 500);
  };
  window.addEventListener("resize", handlehidehadder);
  //END Herder show in mobile view logic

  // const emailAddresses = [
  //     "user@gmail.com"  ,
  //     "user1@gmail.com",
  //     "user2@gmail.com",
  //     "user3@gmail.com",
  //    ];

  // ROLE BUTTON
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // USER SEARCH API

  useEffect(() => {
    const fatchData = async () => {
      try {
        const data = await HandleSearchEmailShareGroup(emailFind);
        // console.log("Full API Responseeeee:", data);
        setApiResponce(data);
        setEmailAddresses(data.data[0]?.email);
      } catch (error) {
        console.error("Fattching error", error);
        setApiResponce(null);
      }
    };
    fatchData();
  }, [emailFind]);

  // console.log(apiResponce, "jsxresponce");
  // console.log(apiResponce, "emailAddresses");

  //FIND USER USING EMAIL

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    console.log(typeof emailAddresses, "typeodf"); // Check the type of emailAddresses
    console.log(emailAddresses); // Log emailAddresses content

    return inputLength === 0
      ? []
      : emailAddresses.filter(
          (email) => email.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setEmailFind(suggestion);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: "example@gmail.com",
    value: emailFind,
    onChange: (e) => setEmailFind(e.target.value),
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  //Get All Groups

  useEffect(() => {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getAllGroups/${userId}`;
    if (userId) {
      axios
        .get(url, {
          headers: UserHeader,
        })
        .then(async (response) => {
          console.log(response, "responsedata");
          const resData = await decryption(response?.data?.data);
          setAllGroups(resData?.message);
          console.log(resData?.message, "resData");
        })
        .catch((error) => {
          console.error(
            "Error fetching data at GetAllGroups:",
            decryption(error?.response?.data?.data)
          );
        });
    }
  }, [userDetails]);

  // GET SHARE GROUPS DATA API
  useEffect(() => {
    const fatchGroupData = async () => {
      try {
        const shareGroupData = await handleGetAllGroups();
        setShareGroupDataStore(shareGroupData);
        console.log(shareGroupDataStore, "workingdonmme");
        console.log(shareGroupDataStore.data.group.groupId, "workingdone");
        console.log(shareGroupDataStore.data.shareCount, "workingdone");
      } catch (error) {
        console.log(error);
      }
    };
    fatchGroupData();
  }, []);

  console.log(allGroups[1]?.contactList[0]?.firstName, "kjjasay");
  //Delete Group
  const deleteGroup = async (id, userId) => {
    try {
      const data = await handleDeleteGroup(id, userId);
      // console.log(id , userId, "del data");
      console.log(data, "del data");
      toast.success(data?.message);

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error(error?.message);
    }
  };

  const openUpdateModal = (data) => {
    setFormData(
      data || {
        groupName: "",
        contactList: "",
        status: "",
        description: "",
        groupId: "",
      }
    );
    if (data) {
      if (data._id) {
        setFormData((prevData) => ({
          ...prevData,
          groupId: data._id,
        }));
      }
    }
    setShowModalUpdate(true);
  };

  // SHARE GROUP API FUNTION
  const handleShareGroupUser = async () => {
    try {
      const data = {
        userId: userId,
        groupId: selectedGroup?._id,
        contactId: selectedGroup?.contactList,
        role: selectedRole,
        sharedWith: apiResponce.data[0]?._id,
      };
      console.log(data, "selectedGroupList");
      const res = await handleShareGroup(data);
      // setGroupShareIconsUser(true);
      if (res.message === "Group shared successfully") {
        // setGroupShareIconsUser(ture);
      }
      console.log(res, "resresres");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdateInput = () => {
    const { groupName, contactList, status, description, groupId } = formData;

    const data = {
      groupName,
      contactList,
      status,
      description,
      groupId,
    };
    console.log(data, "data");

    UpdateGroupApi(data)
      .then((response) => {
        console.log(response, "response1");
        if (response?.message === "Group updated successfully") {
          setUpdateGroup(response?.data);
        }
        console.log("Updated Group Data:", response?.data);
        toast.success(response?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.error("API error:", error);
        console.log(error);
        console.log(error.message, "message");
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

  // TEXT MINIMIZE  CODE LOGIC
  const ShortText = ({ text, maxChar }) => {
    const shortText = (text, maxChar) => {
      if (typeof text !== "string") {
        return "";
      }

      if (text.length > maxChar) {
        return text.slice(0, maxChar) + "...";
      }

      return text;
    };

    const shortedText = shortText(text, maxChar);

    return <div>{shortedText}</div>;
  };
  // END TEXT MINIMIZE  CODE LOGIC

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 900);
    return () => clearTimeout(timer);
  });

  // console.log(apiResponce, "apiResponce");
  // console.log(allGroups, "allGroupsallGroups");
  // console.log(instanseId, "instanseIdinstanseId");
  // console.log(fatchGroupId, "fatchd");
  // SERCH EMAIL THROUGH USER
  // useEffect(() => {
  //   const fetchSuggestions = async (emailFind) =>{
  //       axios
  //         .get(`https://watspi-dev-aa7972875395.herokuapp.com/api/contact/search/${emailFind}` , {
  //           headers : UserHeader,
  //         })
  //         .then((res) => {
  //           console.log(res , "Responce")
  //           if (res && res.data) {
  //               const decryptedData = decryption(res.data.data);
  //               console.log(decryptedData.message, "decrypted message");
  //               console.log(res.data.data, "response data");
  //               toast.success("User Found ")

  //           } else {
  //               console.error("Invalid response structure:", res);
  //           }
  //       })

  //       .catch((err) => {
  //           console.log(err.message , "Error")
  //           console.log(err.response , "Er")
  //           if (err.response && err.response.data.data) {
  //               const decryptedError = decryption(err.response.data.data);
  //               console.log(decryptedError, "decrypted error");
  //               console.log(err.response.data, "error response data");
  //               toast.success("Not Found")
  //           } else {
  //               console.error("Invalid error response structure:", err);
  //           }
  //       })
  //     }
  // }, []);

  // console.log(emailAddresses , "emailAddresses");

  const handleGroupClick = (groupId) => {
    navigate(`/getsinglegroup/${groupId}`);
  };
  return (
    <>
      <ToastContainer />
      {/* Del Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteGroup(groupsIdToDelete, userId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showModalUpdate} onHide={() => setShowModalUpdate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Group Name"
                value={formData?.groupName}
                onChange={(e) =>
                  setFormData({ ...formData, groupName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact List</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact List"
                value={formData?.contactList}
                onChange={(e) =>
                  setFormData({ ...formData, contactList: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Check
                type="switch"
                id="status-switch"
                label="Active"
                checked={formData.status}
                onChange={() =>
                  setFormData({ ...formData, status: !formData.status })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={formData?.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="Close_btn"
            onClick={() => setShowModalUpdate(false)}
          >
            Close
          </Button>
          <Button className="Update_btn" onClick={handleUpdateInput}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SEACRCHING EMAIL MODAL */}

      <Modal show={searchEmailModel} onHide={() => setsearchEmailModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Search Your Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={(suggestion) => suggestion}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
                renderInputComponent={(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    style={{
                      width: "100%", // Adjust the width as needed
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                )}
                renderSuggestionsContainer={({ containerProps, children }) => (
                  <div
                    {...containerProps}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      width: "350px", // Adjust the width as needed
                      maxHeight: "150px", // Adjust the max height as needed
                      overflowY: "auto",
                      // border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    {children}
                  </div>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              {selectedRole}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => handleRoleSelect("user")}>
                User
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => handleRoleSelect("Admin")}>
                Admin
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button
            variant="primary"
            onClick={() => handleShareGroupUser()}
            // setGroupShareIconsUser(!groupShareIconsUser);
            //  onClick={() => handleShareGroup(selectedGroup, selectedRole , apiResponce )}
          >
            Share
          </Button>

          <Button
            variant="secondary"
            onClick={() => setsearchEmailModel(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              HandleSearchEmailShareGroup(emailFind);
            }}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SEND MESSAGE FOR GROUP  */}

      <Modal
        show={showSendMessageModal}
        onHide={() => setShowSendMessageModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Write Message</Form.Label>
              <Form.Control
                className="instance-selecter-dropdown-box"
                as="textarea"
                rows={6}
                placeholder="Enter your text..."
                value={sendMessageInstance}
                onChange={(e) => {
                  setSendMessageInstance(e.target.value);
                }}
              />

              <Button
                className="Add-new-btn_createbd media-file-upload-btn"
                // onClick={() => attachmentInputs[index].click()}
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </Button>
              <input
                className="Add-new-btn_createbd input-type"
                type="file"

                // onChange={(e) => {
                //   handleSendMediaFileChange(e);
                // }}
              />

              {/* <span>{template.attachmentFileName}</span>{" "} */}
              {/* Display file name */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <select
            className="instance-selecter-dropdown-box"
            style={{ height: "40px", right: "13.7rem", position: "relative" }}
            value={instanseId}
            onChange={(e) => setInstanceId(e.target.value)}
          >
            <option
              value="info"
              disabled
              className="instance-select-fro-message-option"
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ color: "black", height: "5px" }}
              />{" "}
              Select Instances
            </option>
            {/* <options onChange={handleSelectChange}> */}
            {Array.isArray(instanceDataUseContext) &&
              instanceDataUseContext?.map((instance, index) => (
                <option key={index} value={instance.idInstance}>
                  {instance.InstancesName}
                </option>
              ))}
          </select>

          {/* <Button
            variant="danger"
            className="Close_btn"
            // onClick={() => setShowSendMessageModal(false)}
          >
            Cancel
          </Button> */}
          <Button
            variant="primary"
            className="Del_btn"
            onClick={() => {
              handleSendMessageForGroup(
                sendMessageInstance,
                instanseId,
                fatchGroupId,
                userId
              );
            }}
          >
            Send....
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

        <Row
          className="group-row-main-css"
          style={{ padding: "3vh 4.5vh 3vh 0" }}
        >
          {sideBarRender ? (
            <>
              <Col sm="1" lg="1" xl="1" xxl="1">
                {/* <Sidebar2 /> */}
              </Col>
              <Col className="Group-header-for-laptop">
                {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                <Row>
                  <Col
                    sm="11"
                    md="11"
                    lg="11"
                    xl="11"
                    xxl="11"
                    className="Backdrop-myContact2-group-1 Backdrop-myContact2"
                  >
                    <div>
                      <Row
                        className="mob-row width-100"
                        style={{
                          marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        {/* <Col> */}
                        <div className="group2_head_main">
                          <h1
                            className="Grouups-H1"
                            style={{
                              padding: "10px",
                              paddingTop: "20px",
                              fontWeight: "600",
                              color: "#3ab19d",
                            }}
                          >
                            Groups
                          </h1>
                          <span
                            className="search-groups2-main"
                            style={{ display: "flex" }}
                          >
                            <span className="search-groups2">
                              <FaSearch className="search-icon2" />
                              <input
                                type="text"
                                placeholder="Search..."
                                className="grp-2 text-gray focus:text-gray"
                              />
                            </span>
                            <span>
                              <a href="/creategroup2">
                                <button type="button" className="grps2-btn">
                                  Create Group
                                </button>
                              </a>
                            </span>
                          </span>
                        </div>
                        {/* </Col> */}
                      </Row>
                      <Row
                        className="mob-row width-100"
                        style={{
                          marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        <Col>
                          <div className="groups_2_maincontainer">
                            <thead
                              style={{
                                marginBottom: "0",
                                tableLayout: "fixed",
                              }}
                            >
                              <tr
                                style={{ background: "white" }}
                                className="head-gp-tr tr-Groups"
                              >
                                <th className="td-Sno ">No</th>
                                <th className="Group-get-table-contant">
                                  Group Name
                                </th>
                                <th className="Group-get-table-contant">
                                  Group Members
                                </th>
                                <th className="Group-get-table-contant">
                                  Description
                                </th>
                                <th className="Group-get-table-contant">
                                  Status
                                </th>
                                <th className="Group-get-table-contant">
                                  Actions
                                </th>
                              </tr>
                            </thead>

                            <table>
                              {loader && (
                                <Loader
                                  top={50}
                                  height={50}
                                  width={50}
                                  left={50}
                                />
                              )}
                              {allGroups?.length === 0 ? (
                                <p>Groups Not Available</p>
                              ) : (
                                allGroups?.map((group, index) => (
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
                                                  maxChar={10}
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
                                              {/* {group?.groupOwner} */}
                                            </>
                                          ) : null}
                                        </abbr>

                                        {console.log(
                                          group?.groupOwner,
                                          "ownerrrrr"
                                        )}
                                      </td>
                                      <td className="Group-get-table-contant">
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() =>
                                            openUpdateModal({
                                              ...group,
                                              groupId: group?._id,
                                            })
                                          }
                                        />
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setGroupsIdToDelete(group?._id);
                                            setShowDeleteModal(true);
                                          }}
                                        />
                                        <FontAwesomeIcon
                                          icon={faShare}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setSelectedGroup(group);
                                            setsearchEmailModel(true);
                                          }}
                                          // onClick={() => handleShareGroup()}
                                        />
                                        <RiMessage2Fill
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setShowSendMessageModal(true);
                                            setFatchGroupId(group?._id);
                                          }}
                                        />
                                        {/* <Link to="/getsinglegroup"> */}
                                        <GrView
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            {
                                              // navigate
                                              if (group?._id) {
                                                handleGroupClick(
                                                  group.groupId?._id ||
                                                    group?._id
                                                );
                                              } else {
                                                console.error(
                                                  "Group ID not available"
                                                );
                                              }
                                            }
                                          }}
                                        />
                                        {/* </Link> */}
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
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Col sm="2" lg="2" xl="2" xxl="2">
                {/* <Sidebar2 /> */}
              </Col>
              <Col className="Group-header-for-laptop">
                {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                <Row>
                  <Col
                    sm="10"
                    md="9"
                    lg="9"
                    xl="9"
                    xxl="9"
                    className="Backdrop-myContact2-group-1 Backdrop-myContact2"
                  >
                    <div>
                      <Row
                        className="mob-row width-100"
                        style={{
                          marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        {/* <Col> */}
                        <div className="group2_head_main">
                          <h1
                            className="Grouups-H1"
                            style={{
                              padding: "10px",
                              paddingTop: "20px",
                              fontWeight: "600",
                              color: "#3ab19d",
                            }}
                          >
                            Groups
                          </h1>
                          <span
                            className="search-groups2-main"
                            style={{ display: "flex" }}
                          >
                            <span className="search-groups2">
                              <FaSearch className="search-icon2" />
                              <input
                                type="text"
                                placeholder="Search..."
                                className="grp-input-search2 text-gray focus:text-gray"
                              />
                            </span>
                            <span>
                              <a href="/creategroup2">
                                <button type="button" className="grps2-btn">
                                  Create Group
                                </button>
                              </a>
                            </span>
                          </span>
                        </div>
                        {/* </Col> */}
                      </Row>
                      <Row
                        className="mob-row width-100"
                        style={{
                          marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        <Col>
                          <div className="groups_2_maincontainer">
                            <thead
                              style={{
                                marginBottom: "0",
                                tableLayout: "fixed",
                              }}
                            >
                              <tr
                                style={{ background: "white" }}
                                className="head-gp-tr tr-Groups"
                              >
                                <th className="td-Sno ">No</th>
                                <th className="Group-get-table-contant">
                                  Group Name
                                </th>
                                <th className="Group-get-table-contant">
                                  Group Members
                                </th>
                                <th className="Group-get-table-contant">
                                  Description
                                </th>
                                <th className="Group-get-table-contant">
                                  Status
                                </th>
                                <th className="Group-get-table-contant">
                                  Actions
                                </th>
                              </tr>
                            </thead>

                            {/* {(!allGroups || allGroups?.length === 0) && shareGroupDataStore.length === 0 ? (
                          <p>Groups Not Fonud</p>
                        ) : (
                          allGroups?.map((group, index) => (
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
                                {group.groupName}
                              </td>
                              <td className="Group-get-table-contant">
                              <div className="fixed-height-5rem">
                                {group?.contactList?.map(
                                  (contact, contactIndex) => (
                                    <li key={contactIndex}>{contact}</li>
                                  )
                                )}
                                </div>
                              </td>
                              <td className="Group-get-table-contant">
                                {group?.description}
                              </td>
                              <td className="Group-get-table-contant">
                                {group?.status}
                              </td>
                              <td className="Group-get-table-contant">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "15px",
                                  }}
                                  onClick={() =>
                                    openUpdateModal({
                                      ...group,
                                      groupId: group?._id,
                                    })
                                  }
                                />
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "15px",
                                  }}
                                  onClick={() => {
                                    setGroupsIdToDelete(group?._id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                                <FontAwesomeIcon
                                  icon={faShare}
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "15px",
                                  }}
                                  onClick={() => {
                                    setSelectedGroup(group);
                                    setsearchEmailModel(true);
                                  }}
                                  // onClick={() => handleShareGroup()}
                                />
                                <RiMessage2Fill
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "15px",
                                  }}
                                  onClick={() => {
                                    setShowSendMessageModal(true);
                                    setFatchGroupId(group?._id);
                                  }}
                                />
                              </td>
                            </tr>
                          ))
                        )} */}
                            <table>
                              {loader && (
                                <Loader
                                  top={50}
                                  height={50}
                                  width={50}
                                  left={50}
                                />
                              )}
                              {allGroups?.length === 0 ? (
                                <p>Groups Not Available</p>
                              ) : (
                                allGroups?.map((group, index) => (
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
                                      {/* <td className="Group-get-table-contant">
                                        <div className="fixed-height-5rem">
                                        {group?.contactList.length}
                                          {group?.contactList?.map(
                                            (contact, contactIndex) => (
                                              <li key={contactIndex}>
                                                <ShortText
                                                  text={contact?.firstName}
                                                  maxChar={10}
                                                />
                                              </li>
                                            )
                                          )}
                                         

                                          {console.log(group?.contactList.length, "check group")}
                                        </div>
                                      </td> */}
                                      <td className="Group-get-table-contant">
                                        <div className="fixed-height-5rem">
                                          {/* Display the count of contacts */}
                                          {group?.contactList.length > 0 && (
                                            <p>
                                              {group?.contactList.length}
                                            </p>
                                          )}

                                          {/* Display the name of the first contact */}
                                          {group?.contactList.length > 0 && (
                                            <p>
                                              {group.contactList[0]?.firstName}
                                            </p>
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
                                              {/* {group?.groupOwner} */}
                                            </>
                                          ) : null}
                                        </abbr>

                                        {console.log(
                                          group?.groupOwner,
                                          "ownerrrrr"
                                        )}
                                      </td>
                                      <td className="Group-get-table-contant">
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() =>
                                            openUpdateModal({
                                              ...group,
                                              groupId: group?._id,
                                            })
                                          }
                                        />
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setGroupsIdToDelete(group?._id);
                                            setShowDeleteModal(true);
                                          }}
                                        />
                                        <FontAwesomeIcon
                                          icon={faShare}
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setSelectedGroup(group);
                                            setsearchEmailModel(true);
                                          }}
                                          // onClick={() => handleShareGroup()}
                                        />
                                        <RiMessage2Fill
                                          style={{
                                            cursor: "pointer",
                                            marginRight: "15px",
                                          }}
                                          onClick={() => {
                                            setShowSendMessageModal(true);
                                            setFatchGroupId(group?._id);
                                          }}
                                        />
                                        {/* <Link to="/getsinglegroup"> */}
                                        <GrView
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {
                                            {
                                              // navigate
                                              if (group?._id) {
                                                handleGroupClick(
                                                  group.groupId?._id ||
                                                    group?._id
                                                );
                                              } else {
                                                console.error(
                                                  "Group ID not available"
                                                );
                                              }
                                            }
                                          }}
                                        />
                                        {/* </Link> */}
                                      </td>
                                    </tr>
                                    <hr
                                      className="saprat-line-in-gourps"
                                      color="white"
                                      size="0"
                                    ></hr>
                                  </>
                                ))
                              )}
                            </table>
                            {/* </div> */}
                          </div>
                        </Col>
                      </Row>
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
}

export default Groups2;
