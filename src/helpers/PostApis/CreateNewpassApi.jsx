import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { toast } from "react-toastify";

export const HandleCreateNewPassword = (
  createNewPassword,
  createConfirmPassword,
  email,
  token,
  navigate
) => {
  console.log("handle ran");

  const data = {
    email: email,
    newPassword: createNewPassword,
    confirmPassword: createConfirmPassword,
    token: token,
  };

  const encrypted = encryption(data);
  console.log(data, "excelEncriptedexcelEncripted");
  console.log(encrypted, "excelEncripted");

  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/users/resetPassword",
      {
        data: encrypted,
      }
    )
    .then(async (response) => {
      const decryptedRes = await decryption(response?.data?.data);

      toast.success(decryptedRes.message);
      alert(decryptedRes.message)
  
      window.location.href = "/";
   
    })
    .catch((err) => {
      const decryptedErr = decryption(err?.response?.data?.data);
      console.log(decryptedErr);
      toast.error(`${decryptedErr.message}`);
      console.log(decryptedErr, "699163699163");
    });
};
