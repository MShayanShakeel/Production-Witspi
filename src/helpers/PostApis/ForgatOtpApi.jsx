import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { toast } from "react-toastify";
// import { useUserdetails } from "../../store/UserContext";

export const handleForgatotp = (email, updateOtpObj, navigate) => {
  const handleUpdateOtp = ({ email, token }) => {
    updateOtpObj({ email: "new@example.com" });
    updateOtpObj({ token: "tokenn" });
    console.log(email, token);
  };

  const data = {
    email: email,
  };
  const encrypted = encryption(data);
  try {
    axios
      .post(
        "https://watspi-dev-aa7972875395.herokuapp.com/api/users/forgetPassword",
        {
          data: encrypted,
        }
      )
      .then((response) => {
        const dcrypetresponse = decryption(response?.data?.data);
        console.log(dcrypetresponse, "responcrmatchotp");
        if (
          dcrypetresponse &&
          dcrypetresponse?.message === "OTP sent successfully"
        ) {
          console.log(1);
          navigate("/forgototp");
          toast.success(dcrypetresponse?.message);
        }
        const token = dcrypetresponse?.token;
        console.log(token, "tokennn", email);
        // handleUpdateOtp(email, token)

        updateOtpObj({ email: email });
        updateOtpObj({ token: token });

        // window.location.href="forgototp"
      })

      .catch((error) => {
        const decryption = decryption(error?.response?.data?.data);
        console.log(decryption(error.response.data.data));
        console.error(
          "Email not valid",
          decryption(error?.response?.data?.data)
        );
        const response = error?.response.data.data;
        console.log(response, "resspp");

        if (response?.message === "OTP Expired!") {
          toast.error("OTP Expired!");
        } else if (response.message === "OTP is wrong ") {
          toast.error("OTP is wrong ");
        }
      });
  } catch (error) {
    console.log(error.data.data);
  }
};
