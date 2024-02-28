import React, { useState, useEffect, useRef, useMemo } from "react";
import { Col, Row, Dropdown, Modal, Button, Form } from "react-bootstrap";
import "./myContact.css";
import * as XLSX from "xlsx";
import { FaSearch } from "react-icons/fa";
import Sidebar2 from "./../Dashboard2/Sidebar/Sidebar2";
import bgImg1 from "../../../images/bg1.jpg";
import CreateContactApi from "../../helpers/PostApis/CreateContact";
import { library } from "@fortawesome/fontawesome-svg-core";
import countryList from "react-select-country-list";
import {
  faEdit,
  faInfoCircle,
  faL,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { RiMessage2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "react-bootstrap/ProgressBar";
import GetAllContacts from "../../helpers/GetApis/GetAllContacts";
import DelIndiContact from "./../../helpers/GetApis/DelIndiContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { useUserdetails } from "../../store/UserContext";
import { decryption, encryption } from "../../helpers/encryptionDecryption";
import { UserHeader } from "../../helpers/Userheader";
import { useSelector } from "react-redux";
import { useUserdetails } from "../../store/UserContext";
import CreateContact from "../create-new-contact/CreateContact";
import Getcontactinfo from "../create-new-contact/Getcontactinfo";
import Headerprofile from "../Header-profile/Headerprofile";
import { handleSendMessageInstance } from "../../helpers/PostApis copy/PostApis/SendMessageInstance";
import { handleScheduleMessage } from "../../helpers/PostApis copy/PostApis/ScheduleMessage";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../Pages/Loader";
import LaptopHeader from "../Header-profile/LaptopHeader";

function MyContact2() {
  // const userDetails = useSelector((state) => state.userInfoStore.userDetails?.userObj);
  // const userId = userDetails?._id;
  // const { setInstanceDataUseContext } = useUserdetails();

  const { userDetails, instanceDataUseContext, sideBarRender } =
    useUserdetails();

  // FATCH CONTACT ID WHEN CLICK ON GROUP ICCON
  const [fatchContactId, setFatchContactId] = useState("");
  // FATCH CONTACT ID WHEN CLICK ON GROUP ICCON

  const userId = userDetails?._id;
  const [userDetail, setUserDetail] = useState({});
  // const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [status, setStatus] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const [modalData, setModalData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedDropdownColumn, setSelectedDropdownColumn] = useState(false);
  const [firstNameOptions, setFirstNameOptions] = useState([]);
  const [lastNameOptions, setLastNameOptions] = useState([]);
  const [numberOptions, setNumberOptions] = useState([]);
  const [header, setHeader] = useState("");
  const [selectedNumberOptions, setSelectedNumberOptions] = useState([]);
  const [options, setOptions] = useState([]); // Declare the options array
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDropdowns, setSelectedDropdowns] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const [showComponent, setShowComponent] = useState(false);
  const [showGetcomponent, setShowGetComponent] = useState(false);

  const [excelData, setExcelData] = useState([]);
  const [uploadTime, setUploadTime] = useState(null); // Store the upload time
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [allContacts, setAllContacts] = useState([]);

  // LOADER STATES
  const [showLoader, setShowLoader] = useState(true);

  // Modal All State
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [updateInstance, setUpdateInstance] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactIdToDelete, setContactIdToDelete] = useState(null);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);

  const [sendMessageInstance, setSendMessageInstance] = useState("");
  const [instanceIdStore, setInstanceIdStore] = useState([]);

  const [enterMessageText, setEnterMessageText] = useState(null);

  const [inputMediaFiles, setInputMediaFiles] = useState(null);

  const [activeContact, setActiveContact] = useState(null);
  // const [showGetcontactmodel , setShowgetcontactmodel ] = useState(false);
  // const [menuVisible, setMenuVisible] = useState(false);
  // const [windoWidth, setWindoWidth] = useState(window.innerWidth);
  const [headerShowInMobile, setHeaderShowInMobile] = useState(
    window.innerWidth <= 500
  );

  const [headerShowInLaptop, setHeaderShowInlaptop] = useState(
    window.innerWidth >= 500
  );

  // const [screenSizeForCreateButton, setScreenSizeForCreateButton] = useState(window.innerWidth > 500);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    gender: "",
    email: "",
    country: "",
    age: "",
  });

  const [contactsList, setContactsList] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token, "tokenindisde");

  // const handleScreenSizeForCreateButton = () => {
  //   setScreenSizeForCreateButton(window.innerWidth > 500);
  // };
  // window.addEventListener("resize ", handleScreenSizeForCreateButton);

  // Herder show in mobile view logic
  const handleShowHeader = () => {
    setHeaderShowInMobile(window.innerWidth <= 500);
  };
  window.addEventListener("resize", handleShowHeader);

  const handleHideHadder = () => {
    setHeaderShowInlaptop(window.innerWidth > 500);
  };
  window.addEventListener("resize", handleHideHadder);

  // COUNTRY DRPDOWN CCODE
  const [selectCountrys, setSelectCountrys] = useState("");
  const countrySelecter = useMemo(() => countryList().getData(), []);
  const countries = Array.isArray(countrySelecter) ? countrySelecter : [];

  const handleChangeCountry = (selectedCountry) => {
    setSelectCountrys(selectedCountry);
    setFormData(selectedCountry);
  };
  // CCOUNTER DROPWORN CODE END

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  // console.log(UserHeader, "UserHeader");
  // useEffect(() => {
  //   if (token) {
  //     console.log("if conditionran");
  //     axios
  //       .get(
  //         `https://watspi-dev-aa7972875395.herokuapp.com/api/users/currentUser/${token}`
  //       )
  //       .then((response) => {
  //         console.log("then conditionran");

  //         console.log(token, "tokeninside");
  //         const decrypted = decryption(response?.data?.data);
  //         console.log(decrypted?.userObj, "decryptedcheck");
  //         setUserDetail(decrypted?.userObj);
  //         setUserId(decrypted?.userObj?._id);
  //         const a = decryption(response?.data?.data);
  //       })
  //       .catch((error) => {
  //         console.log("micc", error);
  //         return;
  //       });
  //   }
  // }, [token]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  console.log(searchQuery , "searchQuery" , allContacts);
  const defaultCountries = [
    { name: "USA", flagUrl: "https://flagcdn.com/us.svg" },
    { name: "Pakistan", flagUrl: "https://flagcdn.com/pk.svg" },
    { name: "United Kingdom", flagUrl: "https://flagcdn.com/gb.svg" },
    { name: "Australia", flagUrl: "https://flagcdn.com/au.svg" },
    { name: "China", flagUrl: "https://flagcdn.com/cn.svg" },
  ];

  const openEditModal = (data) => {
    setFormData(
      data || {
        firstName: "",
        lastName: "",
        number: "",
        gender: "",
        email: "",
        country: "",
        age: "",
      }
    );
    setShowModalEdit(true);
  };

  // GET CONTACT API
  // console.log(getContact, "getcontttact")

  const handleGetcontact = async (id) => {
    console.log(id, "get ccontactt api id");
    try {
      axios
        .get(
          `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getcontact/${id}`,
          {
            headers: UserHeader,
          }
        )
        .then((res) => {
          console.log(decryption(res.data.data));
          setActiveContact(decryption(res.data.data)?.message);
        })
        .catch((err) => {
          console.log(decryption(err.response.data.data));
          toast.error(decryption(err.response.data.data).message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //GET ALL CONTACT'S API

  const handleGetAllContact = async () => {
    try {
      const url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getAllContacts/${userDetails?._id}`;
      if (userDetails?._id) {
        const response = await axios.get(url, {
          headers: UserHeader,
        });
        console.log(response, "response");
        const resData = decryption(response?.data?.data);
        setAllContacts(resData?.message);
        console.log(resData);
      }
    } catch (error) {
      console.error(
        "Error fetching data at GetAllContacts:",
        decryption(error.response.data.data)
      );
    }
  };

  useEffect(() => {
    handleGetAllContact();
    setInstanceIdStore(instanceDataUseContext);
  }, [userDetails]);

  //XXXX   END GET ALL CONTACT'S API XXXXX

  //DELETE CONTACT API
  const deleteContact = async (id) => {
    // const encrypted = encryption(data);
    console.log(id, "delete id");
    try {
      axios
        .delete(
          `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/deleteContact/${id}`,
          {
            headers: UserHeader,
          }
        )
        .then((res) => {
          console.log(decryption(res.data.data));
          toast.success("Contact Deleted!");
          setShowDeleteModal(false);
          handleGetAllContact();
        })
        .catch((err) => {
          console.log(decryption(err.response.data.data));
          toast.error(decryption(err.response.data.data).message);
        });
    } catch (err) {
      console.log(err);
    }
  };
  //XXXX   END DELETE CONTACT'S API   //  XXXXX

  // UPDATE CONTACT API
  const handleUpdateContact = async () => {
    const data = formData; //encryption(formData);
    console.log(data?._id, "userDetail");
    console.log(data, "daata");
    const encrypData = await encryption(formData);
    axios
      .post(
        `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/updateContact/${data?._id}`,
        {
          data: encrypData,
        },
        {
          headers: UserHeader,
        }
      )
      .then((res) => {
        console.log(res.data, "data1");
        console.log(res.data.data, "data2");
        const resDectiption = decryption(res?.data?.data);
        console.log(resDectiption, "resDecription");
        console.log(res.data.data.message, "resdata");
        toast.success("Contact Update");
        setShowModalEdit(false);
        handleGetAllContact();
      })
      .catch((err) => {
        console.log(err.response, "err1");
        console.log(err.response.data, "err2");
        console.log(err.response.data.data, "err3");
        const errDecriptionnn = decryption(err.response.data.data);
        console.log(errDecriptionnn, "errDeccription");

        console.log(errDecriptionnn.message, "kskhgio");
        toast.error("not Update");
      });
  };
  //END UPDATE CONTACT API

  //save contact
  // const handleUpdateInput = () => {
  //   const data = formData;

  //   handleAddContactToExcel(data, data?._id);
  //   console.log(data, "dattttta")
  //     .then((response) => {
  //       if (response?.message === "Contact save successfully") {
  //         setUpdateInstance(response?.data);
  //       }
  //       console.log(response, "excel response");
  //       toast.success(response?.message, {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("API error:", error);
  //       toast.error(error?.message, {
  //         position: "top-center",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //     });
  // };

  // SEND MEDIA FILE TO USER API
  // const handelMediaFileUpload = async () => {

  // try {
  //   const data = {
  //     idInstance :  instanseId,
  //     contactId : allContacts[0]?._id,
  //     fileData : fileData,
  //   }
  //   const res = await handleSendMediaFile(data)
  //   handleSendMediaFileChange();
  //   handleSendMediaFileUpload();
  //   console.log(res);
  // } catch (error) {
  // console.log(err.message , "mesage-po")
  // }

  // }

  const [selectedFile, setSelectedFile] = useState(null);

  // const handleSendMediaFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  const handleSendMediaFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  };
  console.log(selectedFile, "selectedFile");

  const handleSendMediaFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("idInstance", instanseId);
      formData.append("contactId", allContacts[0]?._id);

      console.log(formData, "formData");
      // const data = {
      //   idInstance: instanseId,
      //   contactId: allContacts[0]?._id,
      //   fileData : selectedFile,
      // };

      // const encriptedData = encryption(formData);
      // console.log(data, "encdata");
      console.log(selectedFile, "formfata");

      axios
        .post(
          "https://watspi-dev-aa7972875395.herokuapp.com/api/users/instanceSendMedia",
          formData
          // {
          //   formData : encriptedData
          // },
          // {
          //   headers: UserHeader,
          // }
        )

        .then((response) => {
          console.log(response.data.data, "working");
          console.log("File Upload Succcesfully!", response.data);
          setShowSendMessageModal(false);
        })
        .catch((error) => {
          console.log("File uploading Error", error);
          console.log(error.response);
          console.log(decryption(error.response?.data?.data), "messageerr");
          console.log(error.message, "messageerr");
        });
    } else {
      console.warn("No file Selected for upload");
    }
  };

  //ruffffffff

  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    // handleAddContactToExcel
    fileInputRef.current.click(); // Click the hidden file input element
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
          // Assuming your Excel sheet has columns in this order: firstName, lastName, Phone
          const excelData = jsonData.slice(1); // Skip the header row

          // Set the upload time to the current date and time
          const newExcelData = excelData.map(() => {
            const currentTime = new Date();
            const localTime = currentTime.toLocaleString(); // Get the local date and time
            return { Date: currentTime, localTime }; // Add an object with Date and localTime properties
          });
          setUploadTime(newExcelData);

          const dropdownOptions = excelData[0];
          setExcelData(excelData);
          setFilteredData(newExcelData);
          handleOpenModal(excelData);
          setDropdownOptions(dropdownOptions);

          // const columnsToFind = ["firstName", "lastName", "number"];
          const columnsToFind = ["FirstName", "LastName", "Phone"];
          const headerRow = excelData[0];
          const columnIndices = {};

          // Loop through the header row to find the column indices
          headerRow.forEach((cell, index) => {
            if (columnsToFind.includes(cell)) {
              columnIndices[cell] = index;
            }
          });

          // Now, the columnIndices object contains the indices of the columns you want
          console.log(columnIndices);

          // Identify the "Name" column and extract options when excelData is available
          identifyNameColumnAndOptions(excelData);
        };

        reader.readAsBinaryString(file);
      } else {
        // Display an error message or alert for an invalid file type
        alert("Please select a valid Excel file.");
        e.target.value = null; // Reset the file input
      }
    }
  };

  useEffect(() => {
    // Set the initial state when the component loads
    setFilteredData(excelData);
  }, [excelData]);

  // When "All" button is clicked, show all data
  const handleFilterAllClick = () => {
    setFilteredData(excelData);
  };

  //FILTER BY GENDER
  const handleFilterGenderChange = (selectedGender) => {
    // Filter data based on selected gender
    const filteredData = excelData.filter((row) => {
      return row[4] === selectedGender; // gender is at index 4 according to excel file
    });

    setFilteredData(filteredData);
  };
  //FILTER BY COUNTRY
  const handleFilterCountryChange = (selectedCountry) => {
    // Filter data based on selected country
    const filteredData = excelData.filter((row) => {
      return row[5] === defaultCountries[selectedCountry].name; // Country is at index 5 according to excel file
    });

    setFilteredData(filteredData);
  };

  const optionToFieldName = {
    "First Name": "firstName",
    "Last Name": "lastName",
    number: "number",
    Gender: "gender",
    Email: "email",
    Country: "country",
    Age: "age",
  };
  // const handleUploadClick = () => {
  //   setUploadProgress(0);
  //   setUploading(true);
  //   if (selectedOptions.length === 0) {
  //     console.log("No options selected");
  //     return;
  //   }

  //   const promises = excelData?.map(async (entry, index) => {
  //     console.log(entry, "entry");
  //     console.log(index, "index");
  //     const dataToSend = {};

  //     selectedOptions?.forEach((option) => {
  //       const optionIndex = header?.indexOf(option);
  //       if (optionIndex !== -1) {
  //         dataToSend[option] = entry[optionIndex] || ""; // Set empty string as default value if not selected
  //       }
  //       // if (optionIndex !== -1) {
  //       //     // Map the selected header to specific keys in dataToSend
  //       //     const fieldName = optionToFieldName[option];
  //       //     dataToSend[fieldName] = entry[optionIndex] || ''; // Set empty string as default value if not selected
  //       //   }
  //       console.log(optionIndex, "optionIndex");
  //       console.log(dataToSend , "dataToSend")

  //     });

  //     console.log(dataToSend, "dataToSend");
  //     if (Object.keys(dataToSend).length > 0) {
  //       console.log(dataToSend, "inside dataToSend");
  //       return CreateContactApi(dataToSend)
  //         .then((response) => {
  //           setStatus(response?.message);
  //           console.log(response, "response msg");
  //           if (response?.message === "Contact Saved") {
  //             const progress = ((index + 1) / excelData?.length) * 100;
  //             setUploadProgress(progress);
  //             setSuccessModal(true);
  //             return response;
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error.message , "errrrorm")
  //           console.error("API Error:", error);
  //           setErrStatus(
  //             "An error occurred while uploading. Please try again."
  //           );
  //           setShowModal(true);
  //           return error;
  //         });
  //     }

  //     return null;
  //   });

  //   Promise.all(promises)
  //     .then(() => {
  //       setUploading(false);
  //       setShowModal(false);
  //     })
  //     .catch((error) => {
  //       console.error("Promise.all Error:", error);
  //       setUploading(false);
  //       setShowModal(true);
  //     });
  // };

  const handleUploadClick = () => {
    const tempArray = [];
    setUploadProgress(0);
    setUploading(true);

    if (selectedOptions.length === 0) {
      console.log("No options selected");
      return;
    }

    const promises = excelData?.map(async (entry, index) => {
      const dataToSend = selectedOptions.reduce((acc, option) => {
        const optionIndex = header?.indexOf(option);

        if (optionIndex !== -1) {
          acc[option] = entry[optionIndex] || "";
        }
        return acc;
      }, {});

      dataToSend.userId = userId;

      return dataToSend;
    });
    Promise.all(promises)
      .then((dataArray) => {
        // console.log(dataArray , "datatat")
        // tempArray = encryption(dataArray);

        setContactsList(dataArray);
        // const encryppted = encryption(dataArray);

        setContactsList(dataArray);
        setUploading(false);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Promise.all Error:", error);
        setUploading(false);
        setShowModal(true);
      });

    console.log(contactsList, "temparr");
  };

  // const contactSaveUseToExcel = () => {
  //   const data = {
  //     contactsList,
  //     userId,
  //   };
  //   const dataEncription = encryption(data);
  //   console.log(dataEncription, "dataEnc");
  //   console.log(userId, "daEnc");
  //   axios
  //     .post(
  //       "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts",
  //       {
  //         headers: UserHeader,
  //       },
  //       {
  //         data: dataEncription,
  //       }
  //     )
  //     .then((res) => {
  //       const resDecription = decryption(res.data.data);
  //       console.log(resDecription, "resdec");
  //       console.log(res.data.data, "resdata");
  //     })
  //     .catch((err) => {
  //       const errDecription = decryption(err.response.data.data);
  //       console.log(errDecription, "errDec");
  //       console.log(err.response.data.data, "errdata");
  //     });
  // };

  useEffect(() => {
    if (contactsList.length > 0) {
      const encrypted = encryption(contactsList, userId);
      axios
        .post(
          `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts`,
          { data: encrypted },
          {
            headers: UserHeader,
          },
          console.log(userId, "usId")
        )
        .then((res) => {
          const resDecriptionn = decryption(res.data.data);
          console.log(res.data.data, "reushs");
          console.log(resDecriptionn, "resinasdasdres");

          toast.success("Add Contact Succesfully");
        })
        .catch((err) => {
          const ErrDecriptionn = decryption(err.response.data.data);
          console.log("resinasdasderr", ErrDecriptionn);
          toast.error(ErrDecriptionn.message);
        });
    }
  }, [contactsList]);
  console.log(userId, "lkolkk");

  useEffect(() => {
    // Update the selected options when the header changes
    setSelectedOptions(header);
  }, [header]);

  // const handleOpenModal = () => {
  //     setShowModal(true);
  //     setModalData(excelData);
  // };

  const handleOpenModal = (data) => {
    setModalData(data);
    setShowModal(true);
    setSelectedDropdownColumn(true);

    const initialOptions = header?.map((headerText) => headerText);
    setOptions(initialOptions);
  };

  const identifyNameColumnAndOptions = (data) => {
    const headerRow = data[0]; // Assuming the header row is the first row
    const nameColumnIndex = headerRow.findIndex((cell) => cell === "Name");

    if (nameColumnIndex !== -1) {
      const nameOptions = data.slice(1).map((row) => row[nameColumnIndex]);
      setDropdownOptions(nameOptions);
    }
  };
  useEffect(() => {
    if (excelData.length > 0) {
      // Identify the "Name" column and extract options when excelData is available
      identifyNameColumnAndOptions(excelData);

      // Assuming the columns you want to find are "firstName," "lastName," and "number"
      const columnsToFind = ["firstName", "lastName", "number"];
      const headerRow = excelData[0];
      const columnIndices = {};

      // Loop through the header row to find the column indices
      headerRow.forEach((cell, index) => {
        if (columnsToFind.includes(cell)) {
          columnIndices[cell] = index;
        }
      });

      // Now, the columnIndices object contains the indices of the columns you want
      console.log(columnIndices);

      // Extract options for each column and set them in the respective state variables
      const firstNameIndex = columnIndices["firstName"];
      const lastNameIndex = columnIndices["lastName"];
      const numberIndex = columnIndices["number"];

      const firstNameOptions = excelData
        .slice(1)
        .map((row) => row[firstNameIndex]);
      setFirstNameOptions(firstNameOptions);

      const lastNameOptions = excelData
        .slice(1)
        .map((row) => row[lastNameIndex]);
      setLastNameOptions(lastNameOptions);

      const numberOptions = excelData.slice(1).map((row) => row[numberIndex]);
      setNumberOptions(numberOptions);
    }
  }, [excelData]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        // Remove the column from selected options
        return prevOptions.filter((opt) => opt !== option);
      } else {
        // Add the column to selected options
        return [...prevOptions, option];
      }
    });
  };

  const handleShowContactpage = () => {
    setShowComponent(true);
  };
  const handleshowGetcontactpage = (row) => {
    console.log(row, "row");
    handleGetcontact(row?._id);
    setShowGetComponent(true);
  };
  const allContactFound = allContacts;
  console.log(allContacts, allContactFound, "allContacts");
  // console.log(instanceDataUseContext, "instanceDataUseContext");
  // console.log(instanceIdStore, "instanceIdStore");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Find the selected instance based on the value
    // const selectedInstance = instanceDataUseContext.find(
    //   (instance) => instance.value === selectedValue
    // );

    // Now you can use the selected instance as needed
    // console.log("Selected Instance ID:", selectedInstance.id);
    // Do something with the selected instance
  };

  const [instanseId, setInstanceId] = useState("");
  const [selectedData, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    setFormattedDate(formattedDate);
  };

  // LOADER CODE LOGIC  START
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 800);
    return () => clearTimeout(timer);
  });
  //END LOADER CODE LOGIC

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

  // console.log(formattedDate, "000000");
  // console.log(selectedData, "111111");
  // console.log(userId, "222222");
  // console.log(instanseId, "33333");
  // console.log(fatchContactId, "444444");

  useEffect(() => {
    if (Array.isArray(instanceIdStore)) {
      setInstanceId(instanceIdStore[0]?.idInstance);
    }
  }, [instanceIdStore]);

  console.log(
    selectedOptions,
    "shauhgasasiuv11",
    header,
    "shauhgasasiuv222",
    modalData,
    "shauhgasasiuv"
  );
  return (
    <>
      <ToastContainer />
      {/* Message Send Modal */}
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
              {/* <label style={{color: "white" , fontSize : "15px" , marginRight :"2px"}} htmlFor="">Schedule Date & Time</label> */}
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

              <Button
                className="Add-new-btn_createbd media-file-upload-btn"
                // onClick={() => attachmentInputs[index].click()}
              >
                <FontAwesomeIcon icon={faPaperclip} />
              </Button>
              <input
                className="Add-new-btn_createbd input-type"
                type="file"
                onChange={(e) => {
                  handleSendMediaFileChange(e);
                }}
              />

              {/* <span>{template.attachmentFileName}</span>{" "} */}
              {/* Display file name */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <select
            className="instance-selecter-dropdown-box"
            style={{ height: "40px" }}
            value={instanseId}
            onChange={(e) => setInstanceId(e.target.value)}
          >
            <option
              value="info"
              disabled
              className="instance-select-fro-message-option"
              selected="select instances"
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ color: "black", height: "5px" }}
              />{" "}
              Select Instances
            </option>
            {/* <options onChange={handleSelectChange}> */}
            {Array.isArray(instanceIdStore) &&
              instanceIdStore?.map((instance, index) => (
                <option key={instance.idInstance} value={instance.idInstance}>
                  {instance.InstancesName}
                  {/* {console.log(idInstance , "idInstance")} */}
                </option>
              ))}
          </select>

          <Button
            variant="danger"
            className="Close_btn"
            onClick={() =>
              handleScheduleMessage(
                sendMessageInstance,
                instanseId,
                fatchContactId,
                selectedData,
                userId,
                setShowSendMessageModal
              )
            }
          >
            Schedule
          </Button>

          <Button
            variant="primary"
            className="Del_btn"
            onClick={() => {
              handleSendMediaFileUpload();
            }}
          >
            Media...
          </Button>

          <Button
            variant="primary"
            className="Del_btn"
            onClick={() => {
              handleSendMessageInstance(
                sendMessageInstance,
                instanseId,
                fatchContactId,
                userId,
                setShowSendMessageModal,
                setSendMessageInstance
              );
            }}
          >
            Message
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Del Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="Close_btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="Del_btn"
            onClick={() => deleteContact(contactIdToDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}

      <Modal
        style={{ background: "black" }}
        show={showModalEdit}
        onHide={() => setShowModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={formData?.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={formData?.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="number"
                value={formData?.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={formData?.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                value={selectCountrys || formData?.country}
                onChange={(e) => {
                  handleChangeCountry(e.target.value);
                  setFormData({ ...formData, country: e.target.value });
                }}
              >
                <option value="" disabled selected>
                  Select your country
                </option>{" "}
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                value={formData?.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="Close_btn"
            onClick={() => setShowModalEdit(false)}
          >
            Close
          </Button>
          <Button
            className="Update_btn primary"
            onClick={() => {
              // handleUpdateInput();
              handleUpdateContact();
            }}
          >
            {/* handleAddContactToExcel */}
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={successModal} onHide={() => setSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{status}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        style={{
          backgroundImage: `url(${bgImg1})`,
          width: "100%",
          minHeight: "100vh",
          maxHeight: "auto",
          // overflow: "scroll",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {headerShowInMobile ? (
          <Col
            className="col-contact-page"
            // style={{ paddingTop : "2rem"}}
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
        <Row className="shayanshakeel" style={{ padding: "3vh 4.5vh 3vh 0px" }}>
          {sideBarRender ? (
            <>
              <Col sm="1" lg="1" xl="1" xxl="1">
                {/* <Sidebar2 /> */}
              </Col>
              <div style={{ width: "91%", float: "right" }}>
                <Col className="Contact-width-1830-1600">
                  <div className="Contact-Header-width-1200-900">
                    {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                  </div>
                  {/* <div className="main1234"> */}
                  <Row
                    className="mob-row width-100 center-component-class"
                    style={{ marginBottom: "1rem" }}
                  >
                    {/* <Col></Col> */}
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      className="Backdrop-myContact2 width_91"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="card-drop-style">
                        <h1
                          className="h1-MY-contact"
                          style={{
                            padding: "10px",
                            paddingTop: "20px",
                            fontWeight: "600",
                            color: "#388c8c",
                          }}
                        >
                          My Contacts
                        </h1>
                        {allContactFound?.map((item) => {
                          <h1 key={item?.email}>{item[0]?.number}</h1>;
                        })}

                        {/* Search... input box  */}

                        <div className="Contact-button-add-excel-also">
                          <span className="hide-ex-btn">
                            <button
                              onClick={() => handleShowContactpage()}
                              type="button"
                              className="myexecl-btn2 mycontact-btn"
                            >
                              New contact..
                            </button>
                          </span>

                          <span className="hide-ex-btn">
                            <button
                              type="button"
                              onClick={handleFileSelect}
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

                        {/* ya wo div hy jo top par positon day rahi hy  */}

                        <div className="mobile-view-create-contact-excel-btn">
                          <span className="hide-ex-main-btn">
                            <button
                              onClick={() => handleShowContactpage()}
                              type="button"
                              className="myexecl-btn2 mycontact-btn"
                            >
                              New contact
                            </button>
                          </span>

                          <span className="hide-ex-main-btn">
                            <button
                              type="button"
                              onClick={handleFileSelect}
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
                      </div>

                      {headerShowInMobile ? (
                        <p></p>
                      ) : (
                        <form>
                          <Row>
                            <Col>
                              <div className="My-form-input">
                                <div className="Contact-flex-style">
                                  <div className="search-flex-main">
                                    <div className="search-container2">
                                      <FaSearch className="search-icon2" />
                                      <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        className="input-search inputsearch-2"
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className={
                                      filteredData === excelData
                                        ? "selected-btn"
                                        : "unselected-dropdown_2"
                                    }
                                    onClick={handleFilterAllClick}
                                  >
                                    All
                                  </button>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      className={
                                        filteredData === "Gender"
                                          ? "selected-btn"
                                          : "unselected-dropdown_2"
                                      }
                                      id="filterDropdown"
                                    >
                                      Gender
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="menu-Gender">
                                      <Dropdown.Item
                                        value="Male"
                                        onClick={() =>
                                          handleFilterGenderChange("Male")
                                        }
                                      >
                                        Male
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        value="Female"
                                        onClick={() =>
                                          handleFilterGenderChange("Female")
                                        }
                                      >
                                        Female
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        value="Others"
                                        onClick={() =>
                                          handleFilterGenderChange("Others")
                                        }
                                      >
                                        Others
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      className={
                                        filteredData === "Country"
                                          ? "selected-btn"
                                          : "unselected-dropdown_2"
                                      }
                                      id="filterDropdown"
                                    >
                                      Country
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="menu-Country">
                                      {defaultCountries.map(
                                        (country, index) => (
                                          <Dropdown.Item
                                            key={index}
                                            value={index}
                                            onClick={() =>
                                              handleFilterCountryChange(index)
                                            }
                                          >
                                            <img
                                              src={country.flagUrl}
                                              className="country-flag"
                                            />
                                            {country.name}
                                          </Dropdown.Item>
                                        )
                                      )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>

                                {/* <div className="Contact-button-add-excel-also">
                             <span className="hide-ex-btn">
                               <button
                                 onClick={() => handleShowContactpage()}
                                 type="button"
                                 className="myexecl-btn2 mycontact-btn"
                               >
                                 New contact
                               </button>
                             </span>
 
                             <span className="hide-ex-btn">
                               <button
                                 type="button"
                                 onClick={handleFileSelect}
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
                           </div> */}
                              </div>
                              {/* </div> */}
                            </Col>
                          </Row>
                        </form>
                      )}

                      {headerShowInMobile ? (
                        <div className="search-flex-main">
                          <div className="search-container2">
                            <FaSearch className="search-icon2" />
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={handleSearchInputChange}
                              className="input-search inputsearch-2"
                            />
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}

                      {/* <div className="mobile-menu">
                  <button onClick={toggleMenu} className="menu-icon">
                    ☰ Menu
                  </button>
                </div> */}
                      {/* MENU BUTTON END */}
                    </Col>
                  </Row>

                  {/* Start Upload excel File model */}
                  {/* {showLoader && <Loader top={50} left={50} width={50} height={50} />}     */}
                  {showModal && (
                    <div className="excel-mode Main-contact">
                      <div
                        className="container"
                        onHide={() => setShowModal(false)}
                      >
                        <div closeButton>
                          <Modal.Title className="Excel-model-lable">
                            Excel Data
                          </Modal.Title>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <label className="Excel-model-lable">
                                First Name:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("firstName")
                                        ? "firstName"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("firstName") ? (
                                      <option value="firstName">
                                        First Name
                                      </option>
                                    ) : (
                                      <option value="">firstName</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Last Name:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("lastName")
                                        ? "lastName"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("lastName") ? (
                                      <option value="lastName">
                                        Last Name
                                      </option>
                                    ) : (
                                      <option value="">lastName</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Number:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "number",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("number")
                                        ? "number"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("number") ? (
                                      <option value="number">number</option>
                                    ) : (
                                      <option value="">number</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Gender:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "gender",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("gender")
                                        ? "gender"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("gender") ? (
                                      <option value="gender">Gender</option>
                                    ) : (
                                      <option value="">Gender</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Email:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "email",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("email")
                                        ? "email"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("email") ? (
                                      <option value="email">Email</option>
                                    ) : (
                                      <option value="">Email</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Country:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "country",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("country")
                                        ? "country"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("country") ? (
                                      <option value="country">Country</option>
                                    ) : (
                                      <option value="">Country</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">Age:</label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect("age", e.target.value)
                                    }
                                    value={
                                      selectedOptions.includes("age")
                                        ? "age"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("age") ? (
                                      <option value="age">Age</option>
                                    ) : (
                                      <option value="">Age</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            {selectedDropdownColumn && (
                              <div>
                                {selectedDropdownColumn && (
                                  <div>
                                    {uploading ? (
                                      <ProgressBar
                                        animated
                                        now={uploadProgress}
                                        label={`${uploadProgress}%`}
                                      />
                                    ) : (
                                      <div className="div-model-button-excel">
                                        <button
                                          className="Modal-Footer-div"
                                          //  variant="primary"
                                          onClick={handleUploadClick}
                                          // onClick={contactSaveUseToExcel}
                                        >
                                          AddContact
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="MyContact_scroll">
                            <table className="table table-striped">
                              {header?.length > 0 && (
                                <thead>
                                  <tr style={{ color: "black" }}>
                                    {header.map((headerText, index) => (
                                      <th key={index}>{headerText}</th>
                                    ))}
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {modalData?.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                      <td key={cellIndex}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="div-model-button-excel">
                          <div>{errStatus}</div>
                          <button
                            className="Modal-Footer-div"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="Modal-Footer-div"
                            variant="primary"
                            onClick={handleUploadClick}
                            disabled={uploading}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* End  Upload excel File model */}
                  {showComponent && <CreateContact />}
                  {showGetcomponent && (
                    <Getcontactinfo activeContact={activeContact} />
                  )}
                  <Row>
                    {/* <Col sm={1}></Col> */}
                    <Col
                      md={11}
                      lg={11}
                      xl={11}
                      xxl={11}
                      className="Backdrop-myContact2-2 width_91"
                      //  (window.innerWidth === "50px" ?
                      style={{ padding: "15px" }}
                    >
                      {showLoader && (
                        <Loader top={50} left={50} width={50} height={50} />
                      )}
                      <div>
                        <div className="MyContact_2_maincontainer">
                          <thead
                            style={{
                              marginBottom: "1rem",
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
                              <th className="td_min_width">Actions</th>
                            </tr>
                          </thead>
                          {/* <div className="MyContact_2_container"> */}
                          {allContacts?.length < 0 ? (
                            <p>No data found</p>
                          ) : (
                            allContacts?.map((row, index) => (
                              <table>
                                <tbody
                                  className="tbody-font-style"
                                  style={{
                                    marginTop: "1rem",
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
                                      <ShortText
                                        text={row?.email}
                                        maxChar={13}
                                      />
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
                                    <td className="td_min_width">
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          openEditModal(row);
                                          setContactIdToDelete(row?._id);
                                        }}
                                      />
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          setContactIdToDelete(row?._id);
                                          setShowDeleteModal(true);
                                        }}
                                      />
                                      <RiMessage2Fill
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          setShowSendMessageModal(true);
                                          setFatchContactId(row?._id);
                                        }}
                                      />
                                      <span>
                                        <GrView
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleshowGetcontactpage(row)
                                          }
                                        />
                                      </span>
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
                    </Col>
                  </Row>
                  {/* </div> */}
                </Col>
              </div>
            </>
          ) : (
            <>
              <Col sm="2" lg="2" xl="2" xxl="2">
                {/* <Sidebar2 /> */}
              </Col>
              <div style={{ width: "83%", float: "right" }}>
                <Col className="Contact-width-1830-1600">
                  <div className="Contact-Header-width-1200-900">
                    {headerShowInLaptop ? <LaptopHeader /> : <p></p>}
                  </div>
                  {/* <div className="main1234"> */}
                  <Row
                    className="mob-row width-100 center-component-class"
                    style={{ marginBottom: "1rem" }}
                  >
                    {/* <Col></Col> */}
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      className="Backdrop-myContact2 width_91"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div className="card-drop-style">
                        <h1
                          className="h1-MY-contact"
                          style={{
                            padding: "10px",
                            paddingTop: "20px",
                            fontWeight: "600",
                            color: "#388c8c",
                          }}
                        >
                          My Contacts
                        </h1>
                        {allContactFound?.map((item) => {
                          <h1 key={item?.email}>{item[0]?.number}</h1>;
                        })}

                        {/* Search... input box  */}

                        <div className="Contact-button-add-excel-also">
                          <span className="hide-ex-btn">
                            <button
                              onClick={() => handleShowContactpage()}
                              type="button"
                              className="myexecl-btn2 mycontact-btn"
                            >
                              New contact..
                            </button>
                          </span>

                          <span className="hide-ex-btn">
                            <button
                              type="button"
                              onClick={handleFileSelect}
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

                        {/* ya wo div hy jo top par positon day rahi hy  */}

                        <div className="mobile-view-create-contact-excel-btn">
                          <span className="hide-ex-main-btn">
                            <button
                              onClick={() => handleShowContactpage()}
                              type="button"
                              className="myexecl-btn2 mycontact-btn"
                            >
                              New contact
                            </button>
                          </span>

                          <span className="hide-ex-main-btn">
                            <button
                              type="button"
                              onClick={handleFileSelect}
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
                      </div>

                      {headerShowInMobile ? (
                        <p></p>
                      ) : (
                        <form>
                          <Row>
                            <Col>
                              <div className="My-form-input">
                                <div className="Contact-flex-style">
                                  <div className="search-flex-main">
                                    <div className="search-container2">
                                      <FaSearch className="search-icon2" />
                                      <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        className="input-search inputsearch-2"
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className={
                                      filteredData === excelData
                                        ? "selected-btn"
                                        : "unselected-dropdown_2"
                                    }
                                    onClick={handleFilterAllClick}
                                  >
                                    All
                                  </button>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      className={
                                        filteredData === "Gender"
                                          ? "selected-btn"
                                          : "unselected-dropdown_2"
                                      }
                                      id="filterDropdown"
                                    >
                                      Gender
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="menu-Gender">
                                      <Dropdown.Item
                                        value="Male"
                                        onClick={() =>
                                          handleFilterGenderChange("Male")
                                        }
                                      >
                                        Male
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        value="Female"
                                        onClick={() =>
                                          handleFilterGenderChange("Female")
                                        }
                                      >
                                        Female
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        value="Others"
                                        onClick={() =>
                                          handleFilterGenderChange("Others")
                                        }
                                      >
                                        Others
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      className={
                                        filteredData === "Country"
                                          ? "selected-btn"
                                          : "unselected-dropdown_2"
                                      }
                                      id="filterDropdown"
                                    >
                                      Country
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="menu-Country">
                                      {defaultCountries.map(
                                        (country, index) => (
                                          <Dropdown.Item
                                            key={index}
                                            value={index}
                                            onClick={() =>
                                              handleFilterCountryChange(index)
                                            }
                                          >
                                            <img
                                              src={country.flagUrl}
                                              className="country-flag"
                                            />
                                            {country.name}
                                          </Dropdown.Item>
                                        )
                                      )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>

                                {/* <div className="Contact-button-add-excel-also">
                             <span className="hide-ex-btn">
                               <button
                                 onClick={() => handleShowContactpage()}
                                 type="button"
                                 className="myexecl-btn2 mycontact-btn"
                               >
                                 New contact
                               </button>
                             </span>
 
                             <span className="hide-ex-btn">
                               <button
                                 type="button"
                                 onClick={handleFileSelect}
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
                           </div> */}
                              </div>
                              {/* </div> */}
                            </Col>
                          </Row>
                        </form>
                      )}

                      {headerShowInMobile ? (
                        <div className="search-flex-main">
                          <div className="search-container2">
                            <FaSearch className="search-icon2" />
                            <input
                              type="text"
                              placeholder="Search..."
                              value={searchQuery}
                              onChange={handleSearchInputChange}
                              className="input-search inputsearch-2"
                            />
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}

                      {/* <div className="mobile-menu">
                  <button onClick={toggleMenu} className="menu-icon">
                    ☰ Menu
                  </button>
                </div> */}
                      {/* MENU BUTTON END */}
                    </Col>
                  </Row>

                  {/* Start Upload excel File model */}
                  {/* {showLoader && <Loader top={50} left={50} width={50} height={50} />}     */}
                  {showModal && (
                    <div className="excel-mode Main-contact">
                      <div
                        className="container"
                        onHide={() => setShowModal(false)}
                      >
                        <div closeButton>
                          <Modal.Title className="Excel-model-lable">
                            Excel Data
                          </Modal.Title>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <label className="Excel-model-lable">
                                First Name:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("firstName")
                                        ? "firstName"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("firstName") ? (
                                      <option value="firstName">
                                        First Name
                                      </option>
                                    ) : (
                                      <option value="">firstName</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Last Name:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("lastName")
                                        ? "lastName"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("lastName") ? (
                                      <option value="lastName">
                                        Last Name
                                      </option>
                                    ) : (
                                      <option value="">lastName</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Number:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "number",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("number")
                                        ? "number"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("number") ? (
                                      <option value="number">number</option>
                                    ) : (
                                      <option value="">number</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Gender:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "gender",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("gender")
                                        ? "gender"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("gender") ? (
                                      <option value="gender">Gender</option>
                                    ) : (
                                      <option value="">Gender</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Email:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "email",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("email")
                                        ? "email"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("email") ? (
                                      <option value="email">Email</option>
                                    ) : (
                                      <option value="">Email</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">
                                Country:
                              </label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect(
                                        "country",
                                        e.target.value
                                      )
                                    }
                                    value={
                                      selectedOptions.includes("country")
                                        ? "country"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("country") ? (
                                      <option value="country">Country</option>
                                    ) : (
                                      <option value="">Country</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="Excel-model-lable">Age:</label>
                              {header?.length > 0 && (
                                <div>
                                  <select
                                    className="model-select-box"
                                    onChange={(e) =>
                                      handleOptionSelect("age", e.target.value)
                                    }
                                    value={
                                      selectedOptions.includes("age")
                                        ? "age"
                                        : ""
                                    }
                                  >
                                    {selectedOptions.includes("age") ? (
                                      <option value="age">Age</option>
                                    ) : (
                                      <option value="">Age</option>
                                    )}
                                    {header?.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            {selectedDropdownColumn && (
                              <div>
                                {selectedDropdownColumn && (
                                  <div>
                                    {uploading ? (
                                      <ProgressBar
                                        animated
                                        now={uploadProgress}
                                        label={`${uploadProgress}%`}
                                      />
                                    ) : (
                                      <div className="div-model-button-excel">
                                        <button
                                          className="Modal-Footer-div"
                                          //  variant="primary"
                                          onClick={handleUploadClick}
                                          // onClick={contactSaveUseToExcel}
                                        >
                                          AddContact
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="MyContact_scroll">
                            <table className="table table-striped">
                              {header?.length > 0 && (
                                <thead>
                                  <tr
                                    style={{
                                      color: "black",
                                      boxShadow: "1px 1px 1px 1px lightblue",
                                    }}
                                  >
                                    {header.map((headerText, index) => (
                                      <th key={index}>{headerText}</th>
                                    ))}
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {modalData?.map((row, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    style={{
                                      color: "black",
                                      boxShadow: "1px 1px 1px 1px lightblue",
                                    }}
                                  >
                                    {row.map((cell, cellIndex) => (
                                      <td key={cellIndex}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="div-model-button-excel">
                          <div>{errStatus}</div>
                          <button
                            className="Modal-Footer-div"
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="Modal-Footer-div"
                            variant="primary"
                            onClick={handleUploadClick}
                            disabled={uploading}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* End  Upload excel File model */}
                  {showComponent && <CreateContact />}
                  {showGetcomponent && (
                    <Getcontactinfo activeContact={activeContact} />
                  )}
                  <Row>
                    {/* <Col sm={1}></Col> */}
                    <Col
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                      className="Backdrop-myContact2-2 width_91"
                      //  (window.innerWidth === "50px" ?
                      style={{ padding: "15px" }}
                    >
                      {showLoader && (
                        <Loader top={50} left={50} width={50} height={50} />
                      )}
                      <div>
                        <div className="MyContact_2_maincontainer">
                          <thead
                            style={{
                              marginBottom: "1rem",
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
                              <th className="td_min_width">Actions</th>
                            </tr>
                          </thead>
                          {/* <div className="MyContact_2_container"> */}
                          {allContacts?.length < 0 ? (
                            <p>No data found</p>
                          ) : (
                            allContacts?.map((row, index) => (
                              <table>
                                <tbody
                                  className="tbody-font-style"
                                  style={{
                                    marginTop: "1rem",
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
                                      <ShortText
                                        text={row?.email}
                                        maxChar={11}
                                      />
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
                                    <td className="td_min_width">
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          openEditModal(row);
                                          setContactIdToDelete(row?._id);
                                        }}
                                      />
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          setContactIdToDelete(row?._id);
                                          setShowDeleteModal(true);
                                        }}
                                      />
                                      <RiMessage2Fill
                                        style={{
                                          cursor: "pointer",
                                          marginRight: "15px",
                                        }}
                                        onClick={() => {
                                          setShowSendMessageModal(true);
                                          setFatchContactId(row?._id);
                                        }}
                                      />
                                      <span>
                                        <GrView
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleshowGetcontactpage(row)
                                          }
                                        />
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                                <hr
                                  className="saprat-line-in-Contact"
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
                    </Col>
                  </Row>
                  {/* </div> */}
                </Col>
              </div>
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default MyContact2;
