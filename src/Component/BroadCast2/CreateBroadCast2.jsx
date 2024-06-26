import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Col,
  Row,
  Dropdown,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Component/MyContactPage/myContact2.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  faPencil,
  faCheck,
  faPaperclip,
  faPlus,
  faEdit,
  faTrash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./createBdCast.css";
import * as XLSX from "xlsx"; // Import the xlsx library
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import bgImg1 from "../../../images/bg1.jpg";
import { Link, animateScroll as scroller } from "react-scroll";
import Headerprofile from "../Header-profile/Headerprofile";
import LaptopHeader from "../Header-profile/LaptopHeader";
import { useUserdetails } from "../../store/UserContext";
import { RiMessage2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { handleBroadCastapi } from "../../helpers/PostApis/BroadCastMessageApi";
import { handleBroadCastSchedule } from "../../helpers/PostApis/BroadCastSchedule";

function CreateBroadCast2() {
  const isSidebarOpen = useSelector(
    (state) => state.sideBarStore.isSidebarOpen
  );
  const {
    userDetails,
    sideBarRender,
    getAllContactStore,
    instanceDataUseContext,
  } = useUserdetails();

  const [excelData, setExcelData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const instanceOptions = ["Option 1", "Option 2", "Option 3"];
  const [showExcelUploadComponet, setShowExcelUploadComponet] = useState(false);

  const [selectedData, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const [isInputEnabled, setInputEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );
  const [headerShowInLaptop, setHeaderShowInLaptop] = useState(
    window.innerWidth > 500
  );

  // BROADCAST API STATES
  const [templates, setTemplates] = useState([
    { textMessage: "" },
    { textMessage: "" },
    { textMessage: "" },
  ]);

  // Herder show in mobile view logic
  const handleShowHeader = () => {
    setHeaderShowInMobile(window.innerWidth <= 500);
  };
  window.addEventListener("resize", handleShowHeader);

  const handleHideHaddder = () => {
    setHeaderShowInLaptop(window.innerWidth > 500);
  };
  window.addEventListener("resize", handleHideHaddder);
  //END Herder show in mobile view logic

  const templateContainerRefs = useRef(templates.map(() => React.createRef())); // Create refs for template containers

  // Check if the current screen width is less than or equal to 820 pixels
  const isMobileView = window.innerWidth <= 820;

  // Use useEffect to update the templates with the default message when in mobile view
  useEffect(() => {
    if (isMobileView) {
      setTemplates([{ textMessage: "" }]);
    } else {
      // Reset templates to an empty array when not in mobile view
      setTemplates([
        { textMessage: "" },
        { textMessage: "" },
        { textMessage: "" },
      ]);
    }
  }, [isMobileView]);

  // DATA AND TIME CODE
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    setFormattedDate(formattedDate);
  };

  const attachmentInputs = useRef(Array(templates.length).fill(null));
  const [attachmentFiles, setAttachmentFiles] = useState(
    Array(templates.length).fill(null)
  );

  const handleAttachmentSelect = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const allowedFileTypes = [
        ".pdf",
        ".doc",
        ".docx",
        ".mp3",
        ".wav",
        ".mp4",
        ".jpg",
        ".jpeg",
        ".png",
        ".svg",
      ]; // Specify the allowed file types
      const fileExtension = file.name.split(".").pop(); // Get the file extension

      if (allowedFileTypes.includes("." + fileExtension.toLowerCase())) {
        const updatedAttachmentFiles = [...attachmentFiles];
        updatedAttachmentFiles[index] = file;
        setAttachmentFiles(updatedAttachmentFiles);

        // Extract and display only the file name without the full path
        const fileName = file.name;
        const updatedTemplates = [...templates];
        updatedTemplates[index].attachmentFileName = fileName;
        setTemplates(updatedTemplates);
      } else {
        alert("Please select a valid multimedia file (PDF, DOC, or DOCX).");
        e.target.value = null;
      }
    }
  };

  const handleEnableInput = () => {
    setInputEnabled(true);
  };

  const handleSaveInput = () => {
    setInputEnabled(false);
  };

  // const handleComponentShow = () => {
  //   setShowExcelUploadComponet(!showExcelUploadComponet)
  // }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];

          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Assuming your Excel sheet has columns in this order: FirstName, LastName, Phone
          const excelData = jsonData.slice(1); // Skip the header row

          setExcelData(excelData);
        };

        reader.readAsBinaryString(file);
      } else {
        // Display an error message or alert for an invalid file type
        alert("Please select a valid Excel file.");
        e.target.value = null; // Reset the file input
      }
    }
  };

  const mainCrteBDCAST2Ref = useRef();
  const handleAddTemplate = () => {
    // Create a new message template object or any data structure you prefer
    const newTemplate = {
      textMessage: "",
      // Add other properties as needed
    };

    // Update your state or an array that holds message templates
    setTemplates([...templates, newTemplate]);

    // Scroll to the newly added template container
    scroller.scrollTo(`template-${templates.length}`, {
      // Scroll to the last template
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuint",
      containerId: "mainCrteBDCAST2",
      horizontal: true,
    });
  };

  const handleTemplateChange = (e, index) => {
    const updatedTemplates = [...templates];
    updatedTemplates[index].textMessage = e.target.value;
    setTemplates(updatedTemplates);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModel = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // const numbers = getAllContactStore.map((entry) => entry.number);
  // const allInstanceId = instanceDataUseContext?.map(
  //   (instance) => instance?.idInstance
  // );

  const [selectedInstanceIds, setSelectedInstanceIds] = useState([]);

  const handleCheckboxChange = (e) => {
    const instanceId = e.target.value;
    if (e.target.checked) {
      setSelectedInstanceIds([...selectedInstanceIds, instanceId]);
    } else {
      setSelectedInstanceIds(
        selectedInstanceIds.filter((id) => id !== instanceId)
      );
    }
  };

  // EXCEL FILE UPLOAD CODE LOGIC
  //ruffffffff
  const [header, setHeader] = useState([]);
  const [modalData, setModalData] = useState([]);

  const fileInputRef = useRef(null);

  const handleExcelFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const header = jsonData[0];
          setHeader(header);
          const excelData = jsonData.slice(1);
          setModalData(excelData);
        };
        reader.readAsBinaryString(file);
      } else {
        alert("Please select a valid Excel file.");
        e.target.value = null;
      }
    }
  };
  // const [header, setHeader] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [modalData, setModalData] = useState([]);

  // const fileInputRef = useRef(null);

  // const handleExcelFileSelect = () => {
  //   // handleAddContactToExcel
  //   fileInputRef.current.click(); // Click the hidden file input element
  // };

  // const handleFileInputChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //       file.type === "application/vnd.ms-excel"
  //     ) {
  //       const reader = new FileReader();

  //       reader.onload = async (e) => {
  //         const data = e.target.result;
  //         const workbook = XLSX.read(data, { type: "binary" });
  //         const sheetName = workbook.SheetNames[0];

  //         const sheet = workbook.Sheets[sheetName];
  //         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //         const header = jsonData[0];
  //         setHeader(header);
  //         // Assuming your Excel sheet has columns in this order: firstName, lastName, Phone
  //         const excelData = jsonData.slice(1); // Skip the header row

  //         // Set the upload time to the current date and time
  //         const newExcelData = excelData.map(() => {
  //           const currentTime = new Date();
  //           const localTime = currentTime.toLocaleString(); // Get the local date and time
  //           return { Date: currentTime, localTime }; // Add an object with Date and localTime properties
  //         });
  //         setUploadTime(newExcelData);

  //         const dropdownOptions = excelData[0];
  //         setExcelData(excelData);
  //         setFilteredData(newExcelData);
  //         handleOpenModal(excelData);
  //         setDropdownOptions(dropdownOptions);

  //         // const columnsToFind = ["firstName", "lastName", "number"];
  //         const columnsToFind = ["FirstName", "LastName", "Phone"];
  //         const headerRow = excelData[0];
  //         const columnIndices = {};

  //         // Loop through the header row to find the column indices
  //         headerRow.forEach((cell, index) => {
  //           if (columnsToFind.includes(cell)) {
  //             columnIndices[cell] = index;
  //           }
  //         });

  //         // Now, the columnIndices object contains the indices of the columns you want
  //         console.log(columnIndices);

  //         // Identify the "Name" column and extract options when excelData is available
  //         identifyNameColumnAndOptions(excelData);
  //       };

  //       reader.readAsBinaryString(file);
  //     } else {
  //       // Display an error message or alert for an invalid file type
  //       alert("Please select a valid Excel file.");
  //       e.target.value = null; // Reset the file input
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // Set the initial state when the component loads
  //   setFilteredData(excelData);
  // }, [excelData]);

  // useEffect(() => {
  //   setSelectedOptions(header);
  // }, [header]);

  // const handleOpenModal = (data) => {
  //   setModalData(data);
  //   setShowModal(true);
  //   setSelectedDropdownColumn(true);

  //   const initialOptions = header?.map((headerText) => headerText);
  //   setOptions(initialOptions);
  // };

  // const identifyNameColumnAndOptions = (data) => {
  //   const headerRow = data[0]; // Assuming the header row is the first row
  //   const nameColumnIndex = headerRow.findIndex((cell) => cell === "Name");

  //   if (nameColumnIndex !== -1) {
  //     const nameOptions = data.slice(1).map((row) => row[nameColumnIndex]);
  //     setDropdownOptions(nameOptions);
  //   }
  // };
  // useEffect(() => {
  //   if (excelData.length > 0) {
  //     // Identify the "Name" column and extract options when excelData is available
  //     identifyNameColumnAndOptions(excelData);

  //     // Assuming the columns you want to find are "firstName," "lastName," and "number"
  //     const columnsToFind = ["firstName", "lastName", "number"];
  //     const headerRow = excelData[0];
  //     const columnIndices = {};

  //     // Loop through the header row to find the column indices
  //     headerRow.forEach((cell, index) => {
  //       if (columnsToFind.includes(cell)) {
  //         columnIndices[cell] = index;
  //       }
  //     });

  //     // Now, the columnIndices object contains the indices of the columns you want
  //     console.log(columnIndices);

  //     // Extract options for each column and set them in the respective state variables
  //     const firstNameIndex = columnIndices["firstName"];
  //     const lastNameIndex = columnIndices["lastName"];
  //     const numberIndex = columnIndices["number"];

  //     const firstNameOptions = excelData
  //       .slice(1)
  //       .map((row) => row[firstNameIndex]);
  //     setFirstNameOptions(firstNameOptions);

  //     const lastNameOptions = excelData
  //       .slice(1)
  //       .map((row) => row[lastNameIndex]);
  //     setLastNameOptions(lastNameOptions);

  //     const numberOptions = excelData.slice(1).map((row) => row[numberIndex]);
  //     setNumberOptions(numberOptions);
  //   }
  // }, [excelData]);

  // const handleFilterAllClick = () => {
  //   setFilteredData(excelData);
  // };

  console.log(
    // filteredData,
    // "shayanann1",
    // selectedOptions,
    // "shayanann2",
    // header,
    // "shayanann",
    modalData,
    "iladhvoiasvha"
  );

  console.log(
    inputValue,
    templates,
    getAllContactStore,
    selectedInstanceIds,
    userDetails?._id,
    selectedData,
    "inputValue"
  );

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
            style={{ marginTop: "9vh" }}
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

        <div className="Braod-cast-page-main">
          <Row
            className="broadcast-main-div"
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
                      sm="12"
                      md="11"
                      lg="11"
                      xl="11"
                      xxl="11"
                      className="Backdrop-myContact2 Backdrop-myContact2-broadcast "
                    >
                      {/* <Col><LaptopHeader /> </Col> */}

                      <Row
                        className="row-bd-width-100"
                        style={{
                          marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        <Col>
                          <div className="card-drop-style">
                            <h2
                              className="Create-BroadCast-text-h4"
                              style={{
                                marginLeft: "1rem",
                                paddingTop: "10px",
                                fontWeight: "600",
                                color: "#3ab19d",
                              }}
                            >
                              Create BroadCast
                            </h2>
                          </div>
                          <form>
                            <Row className="Broad-cast-items-postion">
                              <Col xs={12} md={4} lg={4}>
                                <div className="instance-form-input ">
                                  <label className="color-white"> Name </label>
                                  <span>
                                    <input
                                      type="text"
                                      placeholder="Name..."
                                      className={`createbrdCast-input text-white focus:text-white ${
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
                                        className="broadCast-edit2"
                                        onClick={handleEnableInput}
                                      />
                                    )}
                                    {isInputEnabled && (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        className="broadCast-edit2"
                                        onClick={handleSaveInput}
                                        style={{ color: "white" }}
                                      />
                                    )}
                                  </span>
                                </div>
                              </Col>

                              <Col xs={12} md={4} lg={4}>
                                <div className="instance-form-input">
                                  <label className="color-white">
                                    {" "}
                                    Select Instance
                                  </label>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      variant="secondary"
                                      id="dropdown-basic"
                                      style={{
                                        width: "100%",
                                        height: "39px",
                                        // marginTop: "-0.36rem",
                                      }}
                                    >
                                      Select Instances
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#3AABA7",
                                        color: "white",
                                      }}
                                    >
                                      {Array.isArray(instanceDataUseContext) &&
                                        instanceDataUseContext.map(
                                          (instance, index) => (
                                            <div
                                              key={index}
                                              className="form-check"
                                            >
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={instance.idInstance}
                                                onChange={handleCheckboxChange}
                                                checked={selectedInstanceIds.includes(
                                                  instance.idInstance
                                                )}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor={`checkbox-${index}`}
                                              >
                                                {instance.InstancesName}
                                              </label>
                                            </div>
                                          )
                                        )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </Col>
                              <Col xs={12} md={4} lg={4}>
                                <div className="instance-form-input">
                                  <label className="color-white">
                                    {" "}
                                    Upload Excel File{" "}
                                  </label>
                                  <span className="hide-ex-btn">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleExcelFileSelect();
                                        setShowExcelUploadComponet(true);
                                      }}
                                      className="myexecl-btn2 mycontact-btn"
                                    >
                                      Add Excel File
                                    </button>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept=".xls, .xlsx"
                                      onChange={handleFileInputChange}
                                      style={{ display: "none" }} // Hide the input
                                    />
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </form>
                        </Col>
                      </Row>
                      <Row
                        className="row-bd-width-100"
                        style={{
                          marginBottom: "10px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        <Col>
                          <Col xs={12} md={12} lg={12}>
                            <div className="instance-form-input">
                              <h5
                                className="color-white broadcast-Message Templates"
                                style={{ marginLeft: "0.5rem" }}
                              >
                                {" "}
                                Message Templates
                              </h5>
                              <div
                                className="message-templates-container"
                                id="mainCrteBDCAST2"
                                ref={mainCrteBDCAST2Ref}
                              >
                                {/* To add a new template */}
                                {templates?.map((template, index) => (
                                  <div
                                    className="card-stylecreatbdcast"
                                    key={index}
                                  >
                                    <form id={`form-file-upload-${index}`}>
                                      <label
                                        id={`text-upload-${index}`}
                                        htmlFor={`input-file-upload-${index}`}
                                        style={{ width: "100%" }}
                                      >
                                        <div className="text-area-main">
                                          <textarea
                                            type="text"
                                            placeholder="Enter your message..."
                                            className="createbrdCast_textarea msg-temp-style text-gray focus:text-gray"
                                            value={template?.textMessage}
                                            onChange={(e) =>
                                              handleTemplateChange(e, index)
                                            }
                                            style={{
                                              border: "none",
                                              resize: "none",

                                              paddingLeft: "20px",
                                            }}
                                          />
                                          <Button
                                            className="Add-new-btn_createbd mob-btn"
                                            onClick={() =>
                                              attachmentInputs[index].click()
                                            } // Trigger file input click
                                          >
                                            <FontAwesomeIcon
                                              icon={faPaperclip}
                                            />
                                          </Button>
                                          <span>
                                            {template.attachmentFileName}
                                          </span>{" "}
                                          {/* Display file name */}
                                          <input
                                            type="file"
                                            accept=".pdf, .doc, .docx, .mp3, .wav, .mp4, .jpg, .jpeg, .png, .svg" // Specify the allowed file types here
                                            onChange={(e) =>
                                              handleAttachmentSelect(e, index)
                                            }
                                            style={{ display: "none" }} // Hide the input element
                                            ref={(input) =>
                                              (attachmentInputs[index] = input)
                                            }
                                          />
                                        </div>
                                      </label>
                                    </form>
                                  </div>
                                ))}
                                {/* To add a new template end */}
                                <Link
                                  to="mainCrteBDCAST2"
                                  smooth={true}
                                  duration={800}
                                  className="w-full"
                                  offset={-150}
                                  style={{ display: "flex" }}
                                >
                                  <Button
                                    className="Add-new-btn_createbd"
                                    onClick={handleAddTemplate}
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </Col>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="msg-btns-style">
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  setShowExcelUploadComponet(false)
                                }
                              >
                                Show Contact
                              </Button>
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                style={{ marginRight: "19px" }}
                                onClick={() => setShowExcelUploadComponet(true)}
                              >
                                Excel Contact{" "}
                              </Button>
                            </div>
                            <div className="msg-btns-style">
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  handleBroadCastapi(
                                    inputValue,
                                    templates,
                                    getAllContactStore,
                                    selectedInstanceIds
                                  )
                                }
                              >
                                Send Now
                              </Button>
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                onClick={openModel}
                              >
                                Schedule
                              </Button>
                              <Modal
                                show={modalOpen}
                                onHide={() => setModalOpen(false)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>
                                    Select data and Time
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <DatePicker
                                    className="DatePicker-class"
                                    placeholderText="Schedule Date & Time"
                                    selected={selectedData}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="Pp"
                                  />
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    className="Close_btn"
                                    onClick={() => setModalOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="danger"
                                    className="Del_btn"
                                    onClick={() =>
                                      handleBroadCastSchedule(
                                        inputValue,
                                        templates,
                                        getAllContactStore,
                                        selectedInstanceIds,
                                        userDetails,
                                        selectedData
                                      )
                                    }
                                  >
                                    Send
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {/* BUTTTON SECTION STARTT HERE */}
                  <>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col sm={1}></Col>
                      <Col
                        md={11}
                        lg={11}
                        xl={12}
                        xxl={12}
                        className="Backdrop-myContact2-2 width_91 header-laptop-view"
                        style={{ padding: "5px 5px 5px 5px" }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <h3
                                style={{
                                  textAlign: "start",
                                  color: "#388c8c",
                                }}
                              >
                                My Contacts
                              </h3>
                            </div>
                            <div className="">
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  setShowExcelUploadComponet(false)
                                }
                              >
                                Show Contacts
                              </Button>
                              <Button
                                className="Add-new-btn_createbd Sd-Sch-font"
                                style={{ marginRight: "19px" }}
                                onClick={() => setShowExcelUploadComponet(true)}
                              >
                                Excel Contact{" "}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </>
                  {/* BUTTTON SECTION ENDD HERE */}

                  {/* contact list sectipon start  */}

                  <Row
                    className="broadcast-main-div"
                    style={{ padding: "3vh 4.5vh 3vh 0" }}
                  >
                    <Col sm="1" lg="1" xl="1" xxl="1">
                      {/* <Sidebar2 /> */}
                    </Col>
                    <Col
                      sm="12"
                      md="11"
                      lg="11"
                      xl="11"
                      xxl="11"
                      className="Backdrop-myContact2 Backdrop-myContact2-broadcast "
                    >
                      <Row
                        className="row-bd-width-100"
                        style={{
                          // marginBottom: "20px",
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        {showExcelUploadComponet ? (
                          <>
                            <div className="main_Crte_BDCAST2">
                              <table
                                className="table"
                                style={{
                                  tableLayout: "fixed",
                                  marginBottom: "0",
                                  width: "100%",
                                }}
                              >
                                <thead
                                  className="bdCast-head-font"
                                  style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                    background: "white",
                                    boxShadow: "0px 2px 0px 0px lightblue",
                                  }}
                                >
                                  <tr
                                    style={{
                                      background: "white",
                                      boxShadow: "0px 2px 0px 0px lightblue",
                                    }}
                                    className="th-font-style"
                                  >
                                    {header.map((headerText, index) => (
                                      <th key={index}>{headerText}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="bdCast-body-font">
                                  {modalData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {row.map((cell, cellIndex) => (
                                        <td
                                          key={cellIndex}
                                          className="color_white"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : (
                          <div>
                            <div className="MyContact_2_maincontainer fixed-height-Broadcast-Contact">
                              <thead
                                style={{
                                  marginBottom: "0",
                                  tableLayout: "fixed",
                                }}
                              >
                                <tr
                                  style={{
                                    background: "white",
                                    boxShadow: "0px 2px 0px 0px lightblue",
                                  }}
                                  className="th-font-style"
                                >
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
                              {getAllContactStore?.length < 0 ? (
                                <p>No data found</p>
                              ) : (
                                getAllContactStore?.map((row, index) => (
                                  <table>
                                    <tbody
                                      className="tbody-font-style"
                                      style={{
                                        marginBottom: "0",
                                        tableLayout: "absolute",
                                        color: "white",
                                      }}
                                    >
                                      <tr key={row._id}>
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
                                      </tr>
                                    </tbody>
                                  </table>
                                  // ))
                                ))
                              )}
                              {/* </div> */}
                            </div>
                          </div>
                        )}
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </>
            ) : (
              <p>
                <>
                  <Col sm="2" lg="2" xl="2" xxl="2">
                    {/* <Sidebar2 /> */}
                  </Col>
                  <Col
                    className="Group-header-for-laptop broad-cast-float-class"
                    style={{
                      float: "right",
                      width: "83%",
                      marginRight: "0.3rem",
                    }}
                  >
                    {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                    <Row>
                      <Col
                        sm="10"
                        md="10"
                        lg="10"
                        xl="10"
                        xxl="10"
                        className="Backdrop-myContact2 Backdrop-myContact2-broadcast "
                      >
                        {/* <Col><LaptopHeader /> </Col> */}

                        <Row
                          className="row-bd-width-100"
                          style={{
                            marginBottom: "20px",
                            marginLeft: "10px",
                            width: "99%",
                          }}
                        >
                          <Col>
                            <div className="card-drop-style">
                              <h2
                                className="Create-BroadCast-text-h4"
                                style={{
                                  marginLeft: "1rem",
                                  paddingTop: "10px",
                                  fontWeight: "600",
                                  color: "#3ab19d",
                                }}
                              >
                                Create BroadCast
                              </h2>
                            </div>
                            <form>
                              <Row className="Broad-cast-items-postion">
                                <Col xs={12} md={4} lg={4}>
                                  <div className="instance-form-input ">
                                    <label className="color-white">
                                      {" "}
                                      Name{" "}
                                    </label>
                                    <span>
                                      <input
                                        type="text"
                                        placeholder="Name..."
                                        className={`createbrdCast-input text-white focus:text-white ${
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
                                          className="broadCast-edit2"
                                          onClick={handleEnableInput}
                                        />
                                      )}
                                      {isInputEnabled && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          className="broadCast-edit2"
                                          onClick={handleSaveInput}
                                          style={{ color: "#388C8C" }}
                                        />
                                      )}
                                    </span>
                                  </div>
                                </Col>

                                <Col xs={12} md={4} lg={4}>
                                  <div className="instance-form-input">
                                    <label className="color-white">
                                      {" "}
                                      Select Instance
                                    </label>
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        variant="secondary"
                                        id="dropdown-basic"
                                        style={{
                                          width: "100%",
                                          height: "39px",
                                          // marginTop: "-0.36rem",
                                        }}
                                      >
                                        Select Instances
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#3AABA7",
                                          color: "white",
                                        }}
                                      >
                                        {Array.isArray(
                                          instanceDataUseContext
                                        ) &&
                                          instanceDataUseContext.map(
                                            (instance, index) => (
                                              <div
                                                key={index}
                                                className="form-check"
                                              >
                                                <input
                                                  type="checkbox"
                                                  className="form-check-input"
                                                  value={instance.idInstance}
                                                  onChange={
                                                    handleCheckboxChange
                                                  }
                                                  checked={selectedInstanceIds.includes(
                                                    instance.idInstance
                                                  )}
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor={`checkbox-${index}`}
                                                >
                                                  {instance.InstancesName}
                                                </label>
                                              </div>
                                            )
                                          )}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </Col>
                                <Col xs={12} md={4} lg={4}>
                                  <div className="instance-form-input">
                                    <label className="color-white">
                                      {" "}
                                      Upload Excel File{" "}
                                    </label>
                                    <span className="hide-ex-btn">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleExcelFileSelect();
                                          setShowExcelUploadComponet(true);
                                        }}
                                        className="myexecl-btn2 mycontact-btn"
                                      >
                                        Add Excel File
                                      </button>
                                      <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".xls, .xlsx"
                                        onChange={handleFileInputChange}
                                        style={{ display: "none" }} // Hide the input
                                      />
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            </form>
                          </Col>
                        </Row>
                        <Row
                          className="row-bd-width-100"
                          style={{
                            marginBottom: "10px",
                            marginLeft: "10px",
                            width: "99%",
                          }}
                        >
                          <Col>
                            <Col xs={12} md={12} lg={12}>
                              <div
                                className="instance-form-input"
                                style={{ marginLeft: "0.5rem" }}
                              >
                                <h4 className="color-white broadcast-Message Templates">
                                  Message Templates
                                </h4>
                                <div
                                  className="message-templates-container"
                                  id="mainCrteBDCAST2"
                                  ref={mainCrteBDCAST2Ref}
                                >
                                  {/* To add a new template */}
                                  {templates?.map((template, index) => (
                                    <div
                                      className="card-stylecreatbdcast"
                                      key={index}
                                    >
                                      <form id={`form-file-upload-${index}`}>
                                        <label
                                          id={`text-upload-${index}`}
                                          htmlFor={`input-file-upload-${index}`}
                                          style={{ width: "100%" }}
                                        >
                                          <div className="text-area-main">
                                            <textarea
                                              type="text"
                                              placeholder="Enter your message..."
                                              className="createbrdCast_textarea msg-temp-style text-gray focus:text-gray"
                                              value={template?.textMessage}
                                              onChange={(e) =>
                                                handleTemplateChange(e, index)
                                              }
                                              style={{
                                                border: "none",
                                                resize: "none",
                                                paddingLeft: "20px",
                                              }}
                                            />
                                            <Button
                                              className="Add-new-btn_createbd mob-btn"
                                              onClick={() =>
                                                attachmentInputs[index].click()
                                              } // Trigger file input click
                                            >
                                              <FontAwesomeIcon
                                                icon={faPaperclip}
                                              />
                                            </Button>
                                            <span>
                                              {template.attachmentFileName}
                                            </span>{" "}
                                            {/* Display file name */}
                                            <input
                                              type="file"
                                              accept=".pdf, .doc, .docx, .mp3, .wav, .mp4, .jpg, .jpeg, .png, .svg" // Specify the allowed file types here
                                              onChange={(e) =>
                                                handleAttachmentSelect(e, index)
                                              }
                                              style={{ display: "none" }} // Hide the input element
                                              ref={(input) =>
                                                (attachmentInputs[index] =
                                                  input)
                                              }
                                            />
                                          </div>
                                        </label>
                                      </form>
                                    </div>
                                  ))}
                                  {/* To add a new template end */}
                                  <Link
                                    to="mainCrteBDCAST2"
                                    smooth={true}
                                    duration={800}
                                    className="w-full"
                                    offset={-150}
                                    style={{ display: "flex" }}
                                  >
                                    <Button
                                      className="Add-new-btn_createbd "
                                      onClick={handleAddTemplate}
                                    >
                                      <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </Col>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                              }}
                            >
                              <div className="msg-btns-style">
                                <Button
                                  className="Add-new-btn_createbd Sd-Sch-font"
                                  style={{ marginRight: "10px" }}
                                  onClick={() =>
                                    handleBroadCastapi(
                                      inputValue,
                                      templates,
                                      getAllContactStore,
                                      selectedInstanceIds
                                    )
                                  }
                                >
                                  Send Now
                                </Button>
                                <Button
                                  className="Add-new-btn_createbd Sd-Sch-font"
                                  onClick={openModel}
                                >
                                  Schedule
                                </Button>
                                <Modal
                                  show={modalOpen}
                                  onHide={() => setModalOpen(false)}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      Select data and Time
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <DatePicker
                                      className="DatePicker-class"
                                      placeholderText="Schedule Date & Time"
                                      selected={selectedData}
                                      onChange={handleDateChange}
                                      minDate={new Date()}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      timeIntervals={15}
                                      dateFormat="Pp"
                                    />
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      className="Close_btn"
                                      onClick={() => setModalOpen(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="danger"
                                      className="Del_btn"
                                      onClick={() =>
                                        handleBroadCastSchedule(
                                          inputValue,
                                          templates,
                                          getAllContactStore,
                                          selectedInstanceIds,
                                          userDetails,
                                          selectedData
                                        )
                                      }
                                    >
                                      Send
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    {/* BUTTTON SECTION STARTT HERE */}
                    <>
                      <Row style={{ marginTop: "1rem" }}>
                        <Col sm={1}></Col>
                        <Col
                          md={11}
                          lg={11}
                          xl={12}
                          xxl={12}
                          className="Backdrop-myContact2-2 width_91 header-laptop-view"
                          style={{ padding: "5px 5px 5px 5px" }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <h3
                                  style={{
                                    textAlign: "start",
                                    color: "#388c8c",
                                  }}
                                >
                                  My Contacts
                                </h3>
                              </div>
                              <div className="">
                                <Button
                                  className="Add-new-btn_createbd Sd-Sch-font"
                                  // style={{ marginRight: "10px" }}
                                  style={{
                                    display:
                                      modalData.length > 0
                                        ? "inline-block"
                                        : "none",
                                  }}
                                  onClick={() =>
                                    setShowExcelUploadComponet(false)
                                  }
                                >
                                  Show Contacts
                                </Button>
                                <Button
                                  className="Add-new-btn_createbd Sd-Sch-font"
                                  // style={{ marginRight: "19px" }}
                                  onClick={() =>
                                    setShowExcelUploadComponet(true)
                                  }
                                  style={{
                                    display:
                                      modalData.length > 0
                                        ? "inline-block"
                                        : "none",
                                  }}
                                >
                                  Excel Contact{" "}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </>
                    {/* BUTTTON SECTION ENDD HERE */}

                    {/* contact list sectipon start  */}
                    <Col
                      sm="12"
                      md="10"
                      lg="10"
                      xl="10"
                      xxl="10"
                      className="broad-cast-contact-1 Backdrop-myContact2 Backdrop-myContact2-broadcast"
                    >
                      <Row
                        className="row-bd-width-100"
                        style={{
                          marginLeft: "10px",
                          width: "99%",
                        }}
                      >
                        {showExcelUploadComponet ? (
                          <>
                            <div className="main_Crte_BDCAST2">
                              <table
                                className="table"
                                style={{
                                  tableLayout: "fixed",
                                  marginBottom: "0",
                                  width: "100%", // Ensure table takes up full width
                                }}
                              >
                                <thead
                                  className="bdCast-head-font"
                                  style={{
                                    position: "sticky", // Stick the header
                                    top: 0, // Place it at the top
                                    zIndex: 1, // Ensure it's above other content
                                    background: "white",
                                    boxShadow: "0px 2px 0px 0px lightblue",
                                  }}
                                >
                                  <tr
                                    style={{
                                      background: "white",
                                      boxShadow: "0px 2px 0px 0px lightblue",
                                    }}
                                    className="th-font-style"
                                  >
                                    {header.map((headerText, index) => (
                                      <th key={index}>{headerText}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="bdCast-body-font">
                                  {modalData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                      {row.map((cell, cellIndex) => (
                                        <td
                                          key={cellIndex}
                                          className="color_white"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </>
                        ) : (
                          <div>
                            <div className="MyContact_2_maincontainer fixed-height-Broadcast-Contact">
                              <thead
                                style={{
                                  marginBottom: "0",
                                  tableLayout: "fixed",
                                }}
                              >
                                <tr
                                  style={{
                                    background: "white",
                                    boxShadow: "0px 2px 0px 0px lightblue",
                                  }}
                                  className="th-font-style"
                                >
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
                              {getAllContactStore?.length < 0 ? (
                                <p>No data found</p>
                              ) : (
                                getAllContactStore?.map((row, index) => (
                                  <table>
                                    <tbody
                                      className="tbody-font-style"
                                      style={{
                                        marginBottom: "0",
                                        tableLayout: "absolute",
                                        color: "white",
                                      }}
                                    >
                                      <tr key={row._id}>
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
                                      </tr>
                                    </tbody>
                                  </table>
                                  // ))
                                ))
                              )}
                              {/* </div> */}
                            </div>
                          </div>
                        )}
                        {/* EXCEL FIEL UPLOAD HERE CODE END*/}
                      </Row>
                    </Col>
                  </Col>
                </>
              </p>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default CreateBroadCast2;
