import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { toast } from "react-toastify";
import { useUserdetails } from "../../store/UserContext";

export const handleForgatOtpMatch = (forgatOtp, email, token , navigate) => {
  // const handleUpdateOtp = ({ email, token , otp }) => {
  //     updateOtpObj({ email: "new@example.com" });
  //     updateOtpObj({ token: "tokenn" });
  //     updateOtpObj({ otp: "otp" });
  //     console.log(email, token , otp);
  //   };
  // if(!email || ! otp || !token){
  //     console.error("Email, OTP, or Token is undefined.");
  //     // console.log(email ||  otp || token , "!email || ! otp || !token")
  //     return;
  // }
  // const { otpObj, updateOtpObj} = useUserdetails();
  // const handleupdateOtpObj  = () => {
  //     updateOtpObj.response;
  // }
  // console.log(updateOtpObj , "updateOtpfeObj");
  // console.log(response , "response")

  const data = {
    email: email,
    otp: forgatOtp,
    token: token,
  };
  const encrypted = encryption(data);
  console.log(data, "datadata");
  console.log(email, "emaillal");
  console.log(forgatOtp, "forgatOtp");
  console.log(token, "token");

  axios
    .post("https://watspi-dev-aa7972875395.herokuapp.com/api/users/matchOTP", {
      data: encrypted,
    })
    .then(async (res) => {
      console.log(res?.data?.data, "resres");
      const decryptedRes = await decryption(res?.data?.data);
      console.log(decryption(res.data.data), "decript data new pass");
      toast.success(decryptedRes.message);
      // window.location.href = "/newpassword";
      navigate("/newpassword")
      

      // toast.success(decryptedRes(res.data.message));
      // const otp = decryptedRes?.otp;
      // console.log(token, "tokennnjjhhkj", email , otp) ;
      // // handleUpdateOtp(email, token)

      // // updateOtpObj({ email: email });
      // updateOtpObj({otp : otp})
      // // updateOtpObj({ token: token });
      // window.location.href="newpassword"
    })
    .catch((err) => {
      const decryptederr = decryption(err?.response?.data?.data);
      console.log(decryptederr.message);
      alert(`${decryptederr.message}`);
    });
};
