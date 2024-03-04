import React, { useEffect, useMemo, useState } from "react";
import bgImg1 from "../../../images/bg1.jpg";
import "./CreateContact.css";
import axios from "axios";
import { decryption, encryption } from "../../helpers/encryptionDecryption";
import { UserHeader } from "../../helpers/Userheader";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useUserdetails } from "../../store/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import countryList from "react-select-country-list";

const CreateContact = () => {
  // const userDetails = useSelector((state) => state.userInfoStore.userDetails?.userObj);
  const [ishidden, setIshidden] = useState(false);

  const { userDetails, setUserDetails } = useUserdetails();
  const userId = userDetails?._id;

  console.log(userDetails?._id, "userifcheck");
  console.log(UserHeader, "UuuuuuuserHeader");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [tags, setTags] = useState([""]);

  const handleChange = (index, event) => {
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleSave = () => {
    const contactsData = [
      {
        firstName: firstName,
        lastName: lastName,
        number: contactNumber,
        age: age,
        gender: gender,
        email: email,
        country: country,
        userId: userId,
      },
    ];

    const encrypted = encryption(contactsData);

    axios
      .post(
        "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts",
        { data: encrypted }, // Corrected: Pass the data directly, no need for an additional object
        {
          headers: UserHeader,
        }
      )
      .then(async (res) => {
        const deccriptioneres = await decryption(res.data.data);
        console.log(decryption(res.data.data));
        console.log(deccriptioneres, "deccriptioneres");
        toast.success("Contact created!");
        setFirstName(""),
          setLastName(""),
          setAge(""),
          setGender(""),
          setContactNumber(""),
          setCountry(""),
          setEmail(""),
          setTags([""]);
        setIshidden(true);
      })
      .catch((err) => {
        const decriptionerr = decryption(err?.response?.data?.data);
        console.log(decriptionerr);
        toast.error(decryption(err.response.data.data).message);
        // console.log(response, "decriptionerr");
      });
  };

  const exitContactcomponent = () => {
    setIshidden(true);
  };

  const [selectCountrys, setSelectCountrys] = useState("");
  const countrySelecter = useMemo(() => countryList().getData(), []);
  const countries = Array.isArray(countrySelecter) ? countrySelecter : [];

  const handleChangeCountry = (selectedCountry) => {
    setSelectCountrys(selectedCountry);
    setCountry(selectedCountry);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#448787",
      color: "white",
      border: "0.5px solid white",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#448787" : "white",
      backgroundColor: state.isSelected ? "white" : "#448787",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <>
      {!ishidden && (
        <div
          className="mainpicdiiv"
          style={{
            backgroundImage: `url(${bgImg1})`,
            width: "100%",
            height: "auto",
            marginBottom: "10px",
            borderRadius: "25px",
          }}
        >
          <ToastContainer />
          {/* <Row>
      
          <Col
            className="Create-contact-col-main"
            sm={12}
            md={11}
            lg={11}
            xxl={12}
            xl={11}
          > */}

          <div className="Main-contact create-contact-2-3">
            <div className="container contact-container">
              <form>
                <div className="row textfield-row">
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">First Name </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="contact-text-field"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Last Name </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="contact-text-field"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6  textfield-col">
                    <label className="lable-create-contact">Email</label>
                    <input
                      type="email"
                      placeholder="email"
                      className="contact-text-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Age</label>
                    <input
                      type="text"
                      placeholder="Age"
                      className="contact-text-field"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Gender </label>

                    {/* <div className="contact-text-field"> */}
                    <div>
                      <select
                        className="Contact-dropdown-Gender contact-text-field"
                        // style={{ width: '150px' }}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {/* </div> */}
                    </div>
                  </div>

                  
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Country </label>

                    <div>
                      <select
                        className="Contact-dropdown-Gender City-dropdown-Gender"
                        value={selectCountrys || country}
                        onChange={(e) => {
                          handleChangeCountry(e.target.value);
                          setCountry(e.target.value);
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
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Phone # No</label>
                    <input
                      type="text"
                      required={true}
                      placeholder="Phone # No"
                      className="contact-text-field"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6 col-sm-6 col-md-6 textfield-col">
                    <label className="lable-create-contact">Tags </label>
                    {tags.map((tag, index) => (
                      <input
                        key={index}
                        value={tag}
                        type="text"
                        placeholder="Tags"
                        className="contact-text-field"
                        onChange={(event) => handleChange(index, event)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="Contact-button-div">
                    {/* {!ishidden && ( */}
                    <button
                      type="button"
                      class="btn-create-contact "
                      onClick={exitContactcomponent}
                    >
                      Back
                    </button>
                    {/* )} */}

                    <button
                      type="button"
                      class="btn-create-contact"
                      onClick={handleAddTag}
                    >
                      Tag's
                    </button>
                    <button
                      type="button"
                      class="btn-create-contact"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                  {/* <strong>Tags:</strong> {tags.join(', ')} */}
                </div>
              </form>
            </div>
          </div>
          {/* </Col>
        </Row> */}
        </div>
      )}
    </>
  );
};

export default CreateContact;
