import React ,{ useState }  from "react";
import "./Newpassword.css";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { HandleCreateNewPassword } from "../../helpers/PostApis/CreateNewpassApi";
import { useUserdetails } from "../../store/UserContext";

const Forgotpass = () => {

  const { otpObj, updateOtpObj} = useUserdetails();
  console.log(otpObj , "abdupdateOtpObj")
  const email = otpObj.email
  const token = otpObj.token

  const [createNewPassword , setCreateNewPassword] = useState(null);
  const [createConfirmPassword , setCreateConfirmPassword] = useState(null);

  if(createNewPassword !== createConfirmPassword){
    toast.error("password is wrong")
  }


//   const isButtonClickable = forgatOtpemail === specificEmail;
   
  // const handalemail = () =>{
  //   setForgatotpemail(e.target.value)
  // } 
  



//   console.log(forgatOtpemail , "forgatOtpemailforgatOtpemail")

  return (
    <>
      <div className="main-newpass">
        <div className="container form-newpass col-6">
          <form>
            <div className="iner-foam-newpass-div col-4">
              <h2 className="login-main-text">Welcome to Watspi!</h2>
              <input
                className="forgaot-newpass"
                type="password"
                placeholder="New Password"
                required
                value={createNewPassword }
                 onChange={(e) =>setCreateNewPassword(e.target.value)}

                
              /> 

               <input
                className="forgaot-newpass"
                type="password"
                placeholder="Re-Enter Password"
                required
                value={createConfirmPassword } 
                onChange={(e) => setCreateConfirmPassword(e.target.value)}

                
              />  

              <div className="">
                <span>
                  {/* <a href="forgototp"> */}
                    <div >

                    {/* {isButtonClickable ? ( */}
                     {/* onClick={() => handleForgatotp(forgatOtpemail) }  */}

                      <div onClick={()=>HandleCreateNewPassword(createNewPassword , createConfirmPassword , email , token)}  className="login-button-newpass" >
                     
                      SAVE
                      </div>
                      {/* ) : null} */}
                   
                    </div>
                
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
