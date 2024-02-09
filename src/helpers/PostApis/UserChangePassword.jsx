import axios from "axios";
// import { UserHeader } from "../Userheader";  
import { decryption, encryption } from "../encryptionDecryption";

export const handelUserChangePassword = (userDetails ,currentPassword ,newPassword ,newConform) => {
  const data = {
    email: userDetails?.email,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: newConform,
  };

  console.log(data , "datapassword");
  const encriptedData = encryption(data);
  console.log(encriptedData, "exnc");

  axios
    .put(
      'https://watspi-dev-aa7972875395.herokuapp.com/api/users/changePassword',
      //   {
      //     headers: UserHeader,
      //   },
      {
        data: encriptedData,
      }
    )
    .then((res) => {
      const deccriptedRes = decryption(res?.data?.data);
      console.log(deccriptedRes, "deccriptedRes");
    })
    .catch((err) => {
      const decriptedErr = decryption(err?.data?.data);
      console.log(decriptedErr, "deccriptederr");
    });
};
