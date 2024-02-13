import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row, Dropdown, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Component/MyContactPage/myContact2.css";

import {
  faPencil,
  faCheck,
  faPaperclip,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./createBdCast.css";
import * as XLSX from "xlsx"; // Import the xlsx library
import Sidebar2 from "../Dashboard2/Sidebar/Sidebar2";
import bgImg1 from "../../../images/bg1.jpg";
import { Link, animateScroll as scroller } from "react-scroll";
import Headerprofile from "../Header-profile/Headerprofile";
import LaptopHeader from "../Header-profile/LaptopHeader";
import { useUserdetails } from "../../store/UserContext";

function CreateBroadCast2() {
  const isSidebarOpen = useSelector(
    (state) => state.sideBarStore.isSidebarOpen
  );
  const {sideBarRender} = useUserdetails();

  const [excelData, setExcelData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const instanceOptions = ["Option 1", "Option 2", "Option 3"];

  const [isInputEnabled, setInputEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );

  const [headerShowInLaptop, setHeaderShowInLaptop] = useState(
    window.innerWidth > 500
  );

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
    console.log("Input Value:", inputValue);
    setInputEnabled(false);
  };

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

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

  // console.log(excelData, 'asad');
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
            {
               sideBarRender ? (     
            <>
            <Col sm="1" lg="1" xl="1" xxl="1">
              <Sidebar2 />
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
                            marginLeft :"1rem",
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
                                Select Instance{" "}
                              </label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="Drop-btnstyle_createbd color-white"
                                >
                                  Select Instance
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                  style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    color: "white",
                                  }}
                                >
                                  {instanceOptions.map((option, index) => (
                                    <div key={index} className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkbox-${index}`}
                                        checked={selectedItems.includes(option)}
                                        onChange={() =>
                                          toggleItemSelection(option)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`checkbox-${index}`}
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                          <Col xs={12} md={4} lg={4}>
                            <div className="instance-form-input">
                              <label className="color-white">
                                {" "}
                                Upload savExcel File{" "}
                              </label>
                              <span>
                                <input
                                  type="file"
                                  accept=".xls, .xlsx"
                                  onChange={handleFileSelect}
                                  className="createbrdCast-input color-white"
                                  style={{
                                    padding: "8px 14px",
                                    backgroundColor: "transparent",
                                  }}
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
                          <h5 className="color-white broadcast-Message Templates">
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
                                        className="createbrdCast_textarea msg-temp-style text-white focus:text-white"
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
                                        <FontAwesomeIcon icon={faPaperclip} />
                                      </Button>
                                      <span>{template.attachmentFileName}</span>{" "}
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
                      <div className="msg-btns-style">
                        <Button
                          className="Add-new-btn_createbd Sd-Sch-font"
                          style={{ marginRight: "10px" }}
                        >
                          Send Now
                        </Button>
                        <Button
                          className="Add-new-btn_createbd Sd-Sch-font"
                          style={{ marginRight: "19px" }}
                        >
                          Schedule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* contact list sectipon start  */}

              <Row
                className="broadcast-main-div"
                style={{ padding: "3vh 4.5vh 3vh 0" }}
              >
                {/* <Col sm="1" lg="1" xl="1" xxl="1">
                  <Sidebar2 />
                </Col> */}
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
                    <h5 style={{ color: "#3ab19d", paddingTop: "0.5vh" ,marginBottom : "-0.2rem" , marginLeft : "5px"}}>
                      Contact List
                    </h5>
                    <div className="main_Crte_BDCAST2">
                      <table
                        className="table"
                        style={{ tableLayout: "fixed", marginBottom: "0" }}
                      >
                        <thead
                          className="bdCast-head-font"
                          style={{ tableLayout: "fixed" }}
                        >
                          <tr>
                            <th className="color_white">No</th>
                            <th className="color_white">FirstName</th>
                            <th className="color_white">LastName</th>
                            <th className="color_white">Phone</th>
                          </tr>
                        </thead>
                      </table>
                      <div className="contact-list-container">
                        <table
                          className="table"
                          style={{ tableLayout: "fixed", marginBottom: "0" }}
                        >
                          <tbody className="bdCast-body-font">
                            {excelData?.map((row, index) => (
                              <tr key={index}>
                                <td className="color_white">{index + 1}</td>
                                <td className="color_white">{row[0]}</td>
                                <td className="color_white">{row[1]}</td>
                                <td className="color_white">{row[6]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Row>
                </Col>
              </Row>
            </Col>
            </>
             ) : (<p> 
              <>
            <Col sm="2" lg="2" xl="2" xxl="2">
              <Sidebar2 />
            </Col>
            <Col className="Group-header-for-laptop broad-cast-float-class" style={{float : "right" , width : "82%"}}>
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
                            marginLeft : "1rem",
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
                                Select Instance{" "}
                              </label>
                              <Dropdown>
                                <Dropdown.Toggle
                                  id="dropdown-basic"
                                  className="Drop-btnstyle_createbd color-white"
                                >
                                  Select Instance
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                  style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    color: "white",
                                  }}
                                >
                                  {instanceOptions.map((option, index) => (
                                    <div key={index} className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`checkbox-${index}`}
                                        checked={selectedItems.includes(option)}
                                        onChange={() =>
                                          toggleItemSelection(option)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`checkbox-${index}`}
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Col>
                          <Col xs={12} md={4} lg={4}>
                            <div className="instance-form-input">
                              <label className="color-white">
                                {" "}
                                Upload savExcel File{" "}
                              </label>
                              <span>
                                <input
                                  type="file"
                                  accept=".xls, .xlsx"
                                  onChange={handleFileSelect}
                                  className="createbrdCast-input color-white"
                                  style={{
                                    padding: "8px 14px",
                                    backgroundColor: "transparent",
                                  }}
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
                          <h5 className="color-white broadcast-Message Templates">
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
                                        className="createbrdCast_textarea msg-temp-style text-white focus:text-white"
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
                                        <FontAwesomeIcon icon={faPaperclip} />
                                      </Button>
                                      <span>{template.attachmentFileName}</span>{" "}
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
                      <div className="msg-btns-style">
                        <Button
                          className="Add-new-btn_createbd Sd-Sch-font"
                          style={{ marginRight: "10px" }}
                        >
                          Send Now
                        </Button>
                        <Button
                          className="Add-new-btn_createbd Sd-Sch-font"
                          style={{ marginRight: "19px" }}
                        >
                          Schedule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* contact list sectipon start  */}

             
                <Col
                  sm="12"
                  md="10"
                  lg="10"
                  xl="10"
                  xxl="10"
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
                    <h5 style={{ color: "#3ab19d", paddingTop: "0.5vh" , marginBottom : "-0.2rem" ,marginLeft : "5px", paddingLeft : "1rem"}}>
                      Contact List
                    </h5>
                    <div className="main_Crte_BDCAST2">
                      <table
                        className="table"
                        style={{ tableLayout: "fixed", marginBottom: "0" }}
                      >
                        <thead
                          className="bdCast-head-font"
                          style={{ tableLayout: "fixed" }}
                        >
                          <tr>
                            <th className="color_white">No</th>
                            <th className="color_white">FirstName</th>
                            <th className="color_white">LastName</th>
                            <th className="color_white">Phone</th>
                          </tr>
                        </thead>
                      </table>
                      <div className="contact-list-container">
                        <table
                          className="table"
                          style={{ tableLayout: "fixed", marginBottom: "0" }}
                        >
                          <tbody className="bdCast-body-font">
                            {excelData?.map((row, index) => (
                              <tr key={index}>
                                <td className="color_white">{index + 1}</td>
                                <td className="color_white">{row[0]}</td>
                                <td className="color_white">{row[1]}</td>
                                <td className="color_white">{row[6]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Row>
                </Col>
            </Col>
            </>
             </p>)}
          </Row>
          {/* <Col                 sm={12}
                md={11}
                lg={11}
                xl={11}
                xxl={11}
                style={{marginLeft : "14vh"}} 
                >
                <Row className='row-bd-width-100 Backdrop-myContact2-2 Broadcast-contact-list-excel-file' style={{ marginTop: "2px" , marginLeft: '10px', width: '99%' }}>
                            <Col >
                           

                                <h4 style={{ color: 'white'  , paddingTop : "1vh"}}>
                                    Contact List
                                </h4>
                                <div className='main_Crte_BDCAST2'>
                                    <table className='table' style={{ tableLayout: "fixed", marginBottom: "0" }}>
                                        <thead className='bdCast-head-font' style={{ tableLayout: "fixed"}}>
                                            <tr>
                                                <th className='color_white'>No</th>
                                                <th className='color_white'>FirstName</th>
                                                <th className='color_white'>LastName</th>
                                                <th className='color_white'>Phone</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div className="contact-list-container">
                                        <table className='table' style={{ tableLayout: "fixed", marginBottom: "0" }}>
                                            <tbody className='bdCast-body-font'>
                                                {excelData?.map((row, index) => (
                                                    <tr key={index}>
                                                        <td className='color_white'>{index + 1}</td>
                                                        <td className='color_white'>{row[0]}</td> 
                                                        <td className='color_white'>{row[1]}</td>
                                                        <td className='color_white'>{row[6]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        </Col> */}
        </div>
       
      </div>
    </>
  );
}

export default CreateBroadCast2;
