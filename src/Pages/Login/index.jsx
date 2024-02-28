import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap"; // Import Modal component
import OtpInput from "react-otp-input";
import "./otpForm.css";
import styles from "./index.module.css";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import whatsapiLogo from "../../../images/watspilogo.png";
import Loader from "./../Loader/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryption, encryption } from "../../helpers/encryptionDecryption";
import countryList from "react-select-country-list";
// import Select from "react-select/dist/declarations/src/Select";

const Login = () => {
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassworn, setShowConfirmPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  // console.log(showOtpModal, "showOtpModal");

  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [otpError, setOtpError] = useState(false);

  const [otpValue, setOtpValue] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  const [signUpToken, setSingUpToken] = useState(null);

  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const isOtpComplete = otpValue?.length === 6;

  const [country, setCountry] = useState("");
  const [selectCountrys, setSelectCountrys] = useState("");
  const [city, setCity] = useState("");
  const countrySelecter = useMemo(() => countryList().getData(), []); // remove the parentheses

  const countries = Array.isArray(countrySelecter) ? countrySelecter : [];

  const handleChangeCountry = (selectedCountry) => {
    setSelectCountrys(selectedCountry);
    setCountry(selectedCountry);
    setCity("");
  };

  const handleChangeCity = (selectedCity) => {
    setCity(selectedCity);
  };

  const dummyData = {
    US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Edmonton"],
    UK: ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
    FR: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    DE: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt"],
    AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    JP: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo"],
    IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    BR: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza"],
    CN: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
    ZA: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
    RU: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],
    MX: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
    KR: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
    IT: ["Rome", "Milan", "Naples", "Turin", "Palermo"],
    ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
    AR: ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Tucuman"],
    NL: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    SE: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Vasteras"],
    CH: ["Zurich", "Geneva", "Bern", "Basel", "Lausanne"],
    NO: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
    DK: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
    FI: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Turku"],
    PT: ["Lisbon", "Porto", "Braga", "Coimbra", "Funchal"],
    GR: ["Athens", "Thessaloniki", "Heraklion", "Patras", "Larissa"],
    TR: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
    EG: ["Cairo", "Alexandria", "Giza", "Shubra El-Kheima", "Port Said"],
    NG: ["Lagos", "Kano", "Ibadan", "Kaduna", "Port Harcourt"],
    KE: ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"],
    NZ: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"],
    SG: ["Singapore City"],
    MY: ["Kuala Lumpur", "Penang", "Johor Bahru", "Ipoh", "Kuching"],
    ID: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"],
    TH: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi"],
    VN: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue", "Nha Trang"],
    PH: ["Manila", "Cebu City", "Davao City", "Quezon City", "Makati"],
    PK: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi"],
    BD: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
    LK: ["Colombo", "Kandy", "Galle", "Jaffna", "Trincomalee"],
    MM: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Pathein"],
    KH: [
      "Phnom Penh",
      "Siem Reap",
      "Sihanoukville",
      "Battambang",
      "Kampong Cham",
    ],
    SA: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
    AE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"],
    QA: ["Doha", "Al Wakrah", "Al Khor", "Umm Salal", "Al Rayyan"],
    KW: [
      "Kuwait City",
      "Al Ahmadi",
      "Hawalli",
      "Farwaniya",
      "Mubarak Al-Kabeer",
    ],
    OM: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"],
    BH: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Aali"],
    IQ: ["Baghdad", "Basra", "Mosul", "Erbil", "Kirkuk"],
    IR: ["Tehran", "Mashhad", "Isfahan", "Tabriz", "Shiraz"],
    AF: ["Kabul", "Herat", "Mazar-i-Sharif", "Kandahar", "Jalalabad"],
    IN: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore"],
    BD: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet"],
    NP: ["Kathmandu", "Pokhara", "Lalitpur", "Bharatpur", "Biratnagar"],
    BT: ["Thimphu", "Phuntsholing", "Paro", "Punakha", "Jakar"],
    LK: ["Colombo", "Kandy", "Galle", "Jaffna", "Trincomalee"],
    MV: ["Male", "Hulhumale", "Fuvahmulah", "Addu City", "Kulhudhuffushi"],
    MM: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Pathein"],
    TH: ["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi"],
    VN: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Nha Trang", "Hue"],
    KH: ["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Kampot"],
    PH: ["Manila", "Cebu City", "Davao City", "Quezon City", "Makati"],
    ID: ["Jakarta", "Bali", "Surabaya", "Bandung", "Medan"],
    MY: ["Kuala Lumpur", "Penang", "Johor Bahru", "Ipoh", "Malacca City"],
    SG: ["Singapore City"],
    BN: ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong", "Bangar"],
    TL: ["Dili", "Maliana", "Suai", "Baucau", "Viqueque"],
    PH: ["Manila", "Cebu City", "Davao City", "Quezon City", "Makati"],
  };

  const getCityOptions = () => {
    // console.log(" : ", country);
    // console.log("Dummy Data for Selected Country: ", dummyData[country]);

    return dummyData[country] || [];
  };

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (timer <= 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  const handleResendClick = () => {
    console.log("Resend button clicked");
    setTimer(60);
    setIsTimerRunning(true);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    // setIsSignedUp(true);
    if (
      !fullName ||
      !email ||
      !city ||
      !country ||
      !password ||
      password !== confirmPassword
    ) {
      setLoginError("Invalid Email or Password");
      return;
    }
    setShowLoader(true);

    const userData = {
      name: fullName,
      email: email,
      password: password,
      city: city,
      country: country,
    };
    console.log("Data to be sent:", { name: fullName, email, password });
    console.log(userData, "useree33");
    if (!validateEmail(email)) {
      setSignUpError("Invalid Email");
      return;
    } else if (confirmPassword !== password) {
      setSignUpError("Password doesn't match");
      return;
    }
    console.log(userData, "encrypted data");
    const encrypted = encryption(userData);

    axios
      .post("https://watspi-dev-aa7972875395.herokuapp.com/api/users/signup", {
        data: encrypted,
      })
      .then((res) => {
        // let response = res?.data;
        console.log(res, "responsesing");
        // localStorage.setItem("token", response?.token);
        const main = decryption(res?.data?.data);
        localStorage.setItem("token", decryption(res?.data?.data));
        console.log(main, "main", main?.token);
        setSignupEmail(main?.result?.email);
        setSingUpToken(main?.token);

        // setSignupEmail(response?.result?.email);
        setShowLoader(false);
        // window.location.href = "/otpForm";
        // navigate("/otpForm");
        setShowOtpModal(true);
      })
      .catch((err) => {
        console.log("error inside catch", err);
        const response = decryption(err?.response?.data?.data);
        console.log(response, "response Signup");

        if (response?.message === "Email already exists") {
          setSignUpError("Email already exists.");
        } else if (response?.message === "Please enter all fields") {
          setSignUpError("Please enter all fields");
        } else if (response?.message !== "unverified") {
          setSignUpError("Please verify Using Otp sent to your email!!!");
        } else {
          setSignUpError("Error occurred Occured at signUp");
        }
        setShowLoader(false);
      });
  };

  // console.log(signUpToken, "signiuptok")

  //OTP API
  const verifyOtp = () => {
    const requestBody = {
      otp: otpValue,
      token: signUpToken,
    };
    console.log(signUpToken, "signUpTokensignUpToken");
    console.log(requestBody, "requestBody");
    const encrypted = encryption(requestBody);
    console.log(encrypted, "encrypted data Req Otp");

    axios
      .post(
        `https://watspi-dev-aa7972875395.herokuapp.com/api/users/verification`,
        { data: encrypted }
      )
      .then(async (response) => {
        console.log(response, "asd");
        console.log(response?.data?.data, "asd");
        console.log(decryption(response?.data?.data), "asd");
        console.log("OTP verification successful:", response.data);
        const dcrytedresponse = await decryption(response?.data?.data);
        console.log(dcrytedresponse, "dcrytedresponse");
        if (dcrytedresponse?.message === "Signup successful") {
          toast.success(dcrytedresponse?.message);
          setShowOtpModal(false);
          setTimeout(function () {
            window.location.href = "/";
            // navigate("/");
          }, 5000);
        }
      })
      .catch((error) => {
        // console.log(error, "error")
        console.error(
          "OTP verification failed:",
          decryption(error?.response?.data?.data)
        );
        console.log("Setting showOtpModal to true in catch block");
        // setShowOtpModal(true);
        const response = error?.response?.data?.data;
        console.log(response);

        if (response?.message === "OTP Expired") {
          setOtpError("OTP Expired!!!");
          toast.error(setOtpError("OTP Expired!!!"));
        } else if (response?.message === "Please enter correct OTP") {
          setOtpError("Invalid OTP, Please enter the correct OTP.");
          toast.error(
            setOtpError("Invalid OTP, Please enter the correct OTP.")
          );
        } else if (response?.message !== "undefined") {
          setOtpError("OTP is incorrect. Please check your email.");
          toast.error(
            setOtpError("OTP is incorrect. Please check your email.")
          );
        }
      });
  };

  //OTP API ENDS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
    }
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("Invalid Email or Password");
      return;
    }
    setShowLoader(true);
    const credentials = {
      email: email,
      password: password,
    };
    const encrypted = encryption(credentials);
    console.log(encrypted, "encrypted data");

    axios
      .post("https://watspi-dev-aa7972875395.herokuapp.com/api/users/login", {
        data: encrypted,
      })
      .then(async (res) => {
        console.log(res);
        console.log(decryption(res.data.data)?.token, "asd");
        // let response = await decryption(res?.data)
        // console.log(response, "response")
        localStorage.setItem("token", decryption(res.data.data)?.token);
        setShowLoader(false);
        window.location.href = "/dashboard2";
      })
      .catch((err) => {
        // console.log(err?.response?.data?.data)
        console.log(err);
        const response = decryption(err?.response?.data?.data);
        console.log(response);

        if (response?.message == "User not registered") {
          setLoginError("Invalid Credentials, Please Check email.");
        } else if (response?.message == "Incorrect password") {
          setLoginError("Invalid Password, Please Check Your Password.");
        } else if (response?.message == "Email not verified") {
          setLoginError("Email not verified");
        } else {
          setLoginError("An error occurred, Check Credentials");
        }
        setShowLoader(false);
      });
  };

  //Sign up
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassworn);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // const sendOtpSingUp = (e) => {
  //   e.preventDefault();
  //   const dataEmail = {
  //     email: email,
  //   };
  //   const encriptiondata = encryption(dataEmail);

  //   axios
  //     .post("https://watspi-dev-aa7972875395.herokuapp.com/api/users/sendOtp", {
  //       data: encryption,
  //     })
  //     .then((response) => {
  //       const resdecription = decryption(response.data.data);
  //       console.log(response.data.data, "respossssss");
  //       console.log(resdecription.message, "messageinside");
  //       setShowOtpModal(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       const errDecription = decryption(err.response.data.data);
  //       console.log(errDecription);
  //       console.log(err.message, "message");
  //     });
  // };
  return (
    <>
      <ToastContainer />
      <Modal
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        centered
        style={{ backdropFilter: "blur(10px)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="otp-head">Enter OTP</h4>
          <div
            className="otp-parent-div"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p className="txt-center-white">
              Please enter OTP sent on Your Email
            </p>
            <OtpInput
              value={otpValue}
              onChange={setOtpValue}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "40px",
                height: "40px",
                fontSize: "24px",
                textAlign: "center",
                border: "2px solid #ccc",
                borderRadius: "4px",
                margin: "0 4px",
                padding: "8px",
                outline: "none",
                borderColor: "#53585e",
                justifyContent: "center",
              }}
              className="mob-style"
            />
            <div className="md:text-sm text-[0.7rem] text-center">
              Didn't recieve code?{" "}
              <span
                className={`font-bold ${
                  isTimerRunning ? "timer-color" : "timer-sendNow-color"
                }`}
                onClick={isTimerRunning ? undefined : handleResendClick}
              >
                {isTimerRunning ? `Resend in ${timer}s` : "Resend now"}
              </span>
            </div>
            <div className="  w-full flex justify-center">
              <button
                disabled={!isOtpComplete}
                onClick={() => verifyOtp()}
                className={`${
                  isOtpComplete
                    ? "btn-Verify"
                    : "opacity-50 bg-slate-600 text-white cursor-not-allowed inactive-verify"
                } p-2 md:text-xl text-base flex items-center justify-center font-semibold rounded-md 2xl:w-[426px] md:w-[360px] w-full`}
              >
                VERIFY
              </button>
            </div>
          </div>
          {otpError && (
            <div>
              <p
                className="text-center"
                style={{ color: "red", marginTop: "1rem" }}
              >
                Entered wrong code, please enter the code sent on email
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <div className={styles.body}>
        <div className={styles.container}>
          {/* <div className={styles.content_wrapper} style={{
                    right: isLoginForm ? 0 : "calc(100% - 450px)"
                }} /> */}

          <div
            className={`${styles.content} ${
              !isLoginForm ? "bottom-style-trans" : "top-style-trans"
            }`}
            style={{
              right: !isLoginForm ? 0 : "-220px",
              scale: !isLoginForm ? 1 : 0.5,
              transformOrigin: "right center",
              opacity: !isLoginForm ? 1 : 0,
              pointerEvents: !isLoginForm ? "initial" : "none",
            }}
          >
            <button
              className="mob-btn-signin"
              onClick={() => setIsLoginForm(true)}
            >
              Sign In
            </button>
            <div>
              <img
                src={whatsapiLogo}
                alt="Profile-Image"
                style={{ cursor: "pointer", height: "3.5vh" }}
              />
            </div>
            <h2 className="mob-none">Hello There!</h2>
            <h3>Signup to Watspi And Random Text.</h3>
            <div className={styles.content_bottom}>
              <p>Already have an account?</p>
              <button
                className={styles.btn}
                onClick={() => setIsLoginForm(true)}
              >
                Sign In
              </button>
            </div>
          </div>

          <form
            className={`${styles.login_form} ${styles.form} ${
              isLoginForm ? "bottom-style-trans" : "top-style-trans"
            }`}
            style={{
              right: isLoginForm ? 40 : "-220px",
              scale: isLoginForm ? 1 : 0.5,
              transformOrigin: "right center",
              opacity: isLoginForm ? 1 : 0,
              pointerEvents: isLoginForm ? "all" : "none",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleLoginSubmit}
          >
            <div>
              <h2>Sign in to your Watspi Account!</h2>
              <input
                type="email"
                id="email_login"
                placeholder="Enter your email"
                className="placeholder_class"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <input
                type="password"
                id="password_login"
                placeholder="Enter your password"
                className="placeholder_class"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <div className={styles.form_links}>
                <a href="/forgotpass">Forgot password?</a>
                <div className={styles.check_field}>
                  <input type="checkbox" id="remember_login" />
                  <label htmlFor="remember_login">Remember Me</label>
                </div>
              </div>
              <button className={styles.btn}>Sign In</button>
            </div>
            {loginError && (
              <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>
            )}
          </form>

          {/* SIGNUP FORM */}
          <form
            className={`${styles.signup_form} ${styles.form} ${
              isLoginForm ? "top-style-trans" : "bottom-style-trans"
            }`}
            style={{
              left: !isLoginForm ? 40 : "-220px",
              scale: !isLoginForm ? 1 : 0.5,
              transformOrigin: "right center",
              opacity: !isLoginForm ? 1 : 0,
              pointerEvents: !isLoginForm ? "initial" : "none",
            }}
            onSubmit={handleSignUpSubmit}
            // onSubmit={sendOtpSingUp}
          >
            <div>
              <h2>Create Account!</h2>
              <div className={styles.input_container}
              style={{ width: "100%" }}>
                <input
                  type="text"
                  id="name_signup"
                  placeholder="Enter your full name"
                  className="placeholder_class"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
              <div className={styles.input_container} style={{ width: "100%" }}
              >
                <input
                  type="email"
                  id="email_signup"
                  placeholder="Enter your email"
                  className="placeholder_class"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>

              <div className={styles.input_container} style={{ width: "100%" }}
              >
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

              <div className={styles.input_container} style={{ width: "100%" }}
              >
                <select
                  className="Citysss-dropdown-Gender"
                  value={city}
                  onChange={(e) => handleChangeCity(e.target.value)}
                >
                  <option value="" disabled>
                    Select your city
                  </option>

                  {getCityOptions().map((cityOption) => (
                    <option key={cityOption} value={cityOption}>
                      {cityOption}
                    </option>
                  ))}
                  {/* console.log(cityOption); */}
                </select>
              </div>

              <div className={styles.input_container} style={{ width: "100%" }}
              >
                <input
                  type={showPassword ? "text" : "password"} // Toggle the input type between 'text' and 'password'
                  id="password_signup"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder_class"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FiEyeOff className="password-eye-icon" />
                  ) : (
                    <FiEye className="password-eye-icon" />
                  )}
                </span>
              </div>
              <div className={styles.input_container} style={{ width: "100%" }}>
                <input
                  type={showConfirmPassworn ? "text" : "password"}
                  id="confirm_password_signup"
                  placeholder="Conform password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="placeholder_class"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showConfirmPassworn ? (
                    <FiEyeOff className="password-eye-icon" />
                  ) : (
                    <FiEye className="password-eye-icon" />
                  )}
                </span>
              </div>

              {/* <a href="/otpForm"> */}
              <button className={styles.btn}>Sign Up</button>
              {/* </a> */}
              {signUpError && (
                <p style={{ color: "red", textAlign: "center" }}>
                  {signUpError}
                </p>
              )}
            </div>
          </form>

          <div
            className={`${styles.content}  ${
              isLoginForm ? "top-style-trans" : "bottom-style-trans"
            }`}
            style={{
              left: isLoginForm ? 0 : "-220px",
              scale: isLoginForm ? 1 : 0.5,
              transformOrigin: "right center",
              opacity: isLoginForm ? 1 : 0,
              pointerEvents: isLoginForm ? "all" : "none",
            }}
          >
            <div>
              <img
                src={whatsapiLogo}
                alt="Profile-Image"
                style={{ cursor: "pointer", height: "3.5vh" }}
              />
            </div>
            <h2>WELCOME!</h2>
            <h3>Enter your details to continue.</h3>
            <div className={styles.content_bottom}>
              <p>Don't have an account?</p>
              <button
                className={styles.btn}
                onClick={() => setIsLoginForm(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
