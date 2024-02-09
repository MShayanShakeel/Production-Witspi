// import axios from "axios";
// import { decryption, encryption } from "../encryptionDecryption";
// import { UserHeader } from "../Userheader";
// import { toast } from "react-toastify";

// export const handleDeleteGroup = (id, userId) => {
//   const data = {
//     groupId: id,
//     userId: userId,
//   };
//   console.log(data , "running cond");
//   console.log(UserHeader , "mUserHeader")
//   const encripteddata = encryption(data);
//   axios
//     .delete(
//       'https://watspi-dev-aa7972875395.herokuapp.com/api/contact/deleteGroup',
//       {
//         headers: UserHeader
//       },
//       {
//         data: encripteddata
//       }
//     )
//     .then((res) => {
//       const decriptionRes = decryption(res?.data?.data);
//       console.log(decriptionRes, "decriptedres");
//       toast.success(decriptionRes.message);
//     })
//     .catch((err) => {
//       const decripteddErr = decryption(err?.data?.data);
//       console.lof(decripteddErr , "shayannn");
//       toast.error(decripteddErr.message);
//     });
// };


// export default handleDeleteGroup;

import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
export async function handleDeleteGroup(id , userId) {
  try {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/deleteGroup/${id}/${userId}`;
    console.log('API URL:', url);

    console.log(id ,userId , "delet ids");

    const response = await axios.delete(url, {
      headers: UserHeader,
    });
    console.log('Delete Instance API Response:', response);
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.log('Error At Deleting Instance, testing:', decryption(error.response.data.data));
    return error;
  }
}

export default handleDeleteGroup;
