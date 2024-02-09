import React from "react";
import "./Forgotpass.css";
import { handleForgatotp } from "../../helpers/PostApis/ForgatOtpApi";
import { useState } from "react";
import { useUserdetails } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";

const Forgotpass = () => {
  const navigate = useNavigate();
  const { otpObj, updateOtpObj } = useUserdetails();

  const [forgatOtpemail, setForgatotpemail] = useState('');

  const isButtonDisabled = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgatOtpemail);

  const handleEmailChange = (e) => {
    setForgatotpemail(e.target.value);
  };
  const handleSenddotp = () =>{
    if (!isButtonDisabled){
      // handleForgatotp(forgatOtpemail , updateOtpObj , navigate);
    }
  }

  return (
    <>
      <div className="main-login">
        <div className="container form-login col-6">
          <form>
            <div className="iner-foam-div col-4">
              <h2 className="login-main-text">Welcome to Watspi!</h2>
              <input
                className="forgaot-eemail"
                type="email"
                placeholder="Enter your Email"
                required
                value={forgatOtpemail}
                onChange={handleEmailChange}
              />
              <div className="">
                <span>
                  {/* {isButtonClickable ? ( */}
                    <div
                      className="login-button"
                      style={{backgroundColor : isButtonDisabled ? '#3AABA8' : '#FFFFFF',color :  !isButtonDisabled ? '#3AABA8' : '#FFFFFF'}}
                      onClick={()=> {handleForgatotp(forgatOtpemail , updateOtpObj , navigate);
                      handleSenddotp();
                    }}
                      disabled={isButtonDisabled}
                    >
                      Send OTP
                    </div>
                  {/* ) : null} */}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpass;




// import React from "react";
// import "./Forgotpass.css";
// import { Button } from "react-bootstrap";
// import { handleForgatotp } from "../../helpers/PostApis/ForgatOtpApi";
// import { useState } from "react";
// import { useUserdetails } from "../../store/UserContext";
// import { useNavigate } from "react-router-dom";

// const Forgotpass = (email) => {
//   const navigate = useNavigate()

//   const { otpObj, updateOtpObj } = useUserdetails();
//   console.log(email , "otpemail")

//   const [forgatOtpemail , setForgatotpemail] = useState(null);
//   const specificEmail  = "mshayanshakeel786@gmail.com";
//   console.log(otpObj, "otpobject")


//   const isButtonClickable = forgatOtpemail === specificEmail;
   
  
  



//   console.log(forgatOtpemail , "forgatOtpemailforgatOtpemail")

//   return (
//     <>
//       <div className="main-login">
//         <div className="container form-login col-6">
//           <form>
//             <div className="iner-foam-div col-4">
//               <h2 className="login-main-text">welcome to Watspi!</h2>
//               <input
//                 className="forgaot-email"
//                 type="email"
//                 placeholder="Enter your Email"
//                 required
//                 value={ forgatOtpemail } onChange={e => setForgatotpemail(e.target.value)}                
//               />  

//               <div className="">
//                 <span>
//                   {/* <a href="forgototp"> */}
//                     <div >

//                     {isButtonClickable ? (
//                       <div  className="login-button" 
//                       onClick={() => handleForgatotp(forgatOtpemail, updateOtpObj, navigate) }> 
//                       Send OTP 
//                       </div>
//                       ) : null}
                   
//                     </div>
//                   {/* <button className="login-button">Send Otp</button> */}
//                   {/* </a> */}
//                 </span>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Forgotpass;
