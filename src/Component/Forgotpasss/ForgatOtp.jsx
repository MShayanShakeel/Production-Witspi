import React, {useState , useEffect } from "react";
import "./ForgatOtp.css";
import { Form, Button, Card, Modal } from 'react-bootstrap'; // Import Modal component
import OTPInput from "react-otp-input";
import { handleForgatOtpMatch } from "../../helpers/PostApis/ForgatOtpMatch";
import { useUserdetails } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";



// const { userDetails, setUserDetails } = useUserdetails();
// const {otpObj, setOtpObj} = useUserdetails();

//   const userToken = otpObj?.email;
//   const userEmail = otpObj?.otp;
//   const userOtp = otpObj.token;
// console.log(otpObj , "toktnt")


// const handleUpdateOtp = ({updateOtpObj}) => {
  

//   console.log("handleran")
//   updateOtpObj({ email: "new@example.com"});
//   updateOtpObj({ otp : "otp"})
//   updateOtpObj({ token : "tokenn"})

//   console.log(otpObj.email, "insideemail");
//   console.log(otpObj.token, "insideemail");
//   console.log(otpObj.otp, "insideemail");
// };

// const { otpObj, setOtpObj } = updateOtpObj();

    // const userOtp = updateOtpObj?.otp;
    // console.log(userOtp , "userOtpuserOtp");



// const handleUpdateOtp = () => {
//   console.log("handleran");

//   updateOtpObj.userEmail;
//   updateOtpObj.otp;
//   updateOtpObj.token;
//   updateOtpObj({ otp: "res" });
//   updateOtpObj({ token: "tokenn" });

//   console.log(updateOtpObj, "handleUpdateOtphandleUpdateOtp")

// };


// const handleUpdateOtp = ({ otp }) => {
//   updateOtpObj({ otp: otp });
//   console.log(otp , "otpotp");
// };


const ForgatOtp = () => {


  
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [forgatOtp , setForgatotp] = useState(null);

  const navigate = useNavigate()

  const { otpObj, updateOtpObj} = useUserdetails();
  // console.log(updateOtpObj , "abdupdateOtpObj")
  const email = otpObj.email
  const token = otpObj.token
  console.log(otpObj , "updateOtpObjupdateOtpObj")

  


const handleResendClick = () => {
  console.log("Resend button clicked");
  setTimer(60);
  setIsTimerRunning(true);
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
 


  return (
    <>
   

      <Modal show={true}>
        {/* show={showOtpModal} onHide={() => setShowOtpModal(false)} centered
         style={{ backdropFilter: "blur(10px)" }}>
          */}
        <Modal.Header>
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
            <OTPInput
              value={forgatOtp} 
                onChange={setForgatotp}
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
            <a href="/forgotpass">  Didn't recieve code?</a>
              {/* {" "} */}
              <span
                                className={`font-bold ${isTimerRunning
                                    ? "timer-color"
                                    : "timer-sendNow-color"
                                    }`}
                                onClick={isTimerRunning ? undefined  : handleResendClick}
                            >
                                {isTimerRunning ? `Resend in ${timer}s` : "Resend now"}
                            </span>
            </div>
            <div className="w-full flex justify-center">
              <button              
              onClick={() => handleForgatOtpMatch(forgatOtp , email, token , navigate)}
              className="Otp-button-v">
                VERIFY
              </button>
            </div>
          </div>
          {/* {otpError && ( */}
            <div>
              <p
                className="text-center"
                style={{ color: "red", marginTop: "1rem" }}
              >
                {/* Entered wrong code, please enter the code sent on email */}
              </p>
              {/* <button>Show OTP Modal</button> */}
            </div>
          {/* )} */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgatOtp;
