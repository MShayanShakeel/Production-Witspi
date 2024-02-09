// import axios from "axios";
// import { decryption, encryption } from "../encryptionDecryption";
// import { UserHeader } from "../Userheader";
// import { toast } from "react-toastify";
// import { useUserdetails } from "../../store/UserContext";

// const { userDetails, setUserDetails } = useUserdetails();
// const  userId = userDetails?._id;


//  export const handleAddContactToExcel = () => {
//   const data = {
//     firstName: firstName,
//     lastName: lastName,
//     number: contactNumber,
//     age: age,
//     gender: gender,
//     email: email,
//     country: country,
//     userId: userId,
//   };
//   const encrypted = encryption(data);
//   console.log(encrypted, "excelEncripted");
//   axios
//     .post(
//       "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts",
//       {
//         data: encrypted,
//       },
//       {
//         headers: UserHeader,
//       }
//     )
//     .then(async (responce) => {
//       const decriptedRes = await decryption(responce?.data?.data);
//       console.log(decryption(responce.data.data));
//       toast.success(decriptedRes.message);
//     })
//     .catch((err) => {
//       const decriptederr = decryption(err?.responce.data?.data);
//       console.log(decryption.message);
//       toast.error(`${decriptederr.message}`);
//     });
// };
