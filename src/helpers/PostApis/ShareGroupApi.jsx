import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";
// import { useUserdetails } from "../../store/UserContext";
import { toast } from "react-toastify";

export const handleShareGroup = (data) => {
  // console.log(data, "datainside")
  // console.log(apiResponce.data[0]._id, " apiResponce.dat");

  const apiData = {
    userId : data?.userId ,
    groupId: data?.groupId,
    contactId: data?.contactId,
    role: data?.role,
    sharedWith: data?.sharedWith,
  
      // "contactId": ["65c2273772322e736c1dba20","65c2279e72322e736c1dba3a"],
      // "groupId":"65c23ac772322e736c1dbaeb",
      // "role":"user",
      // "sharedWith":"65c1e9fb72322e736c1db17e",
      // "userId": "65bd02631c039db730a59d89"
    
  };
console.log(apiData , "aidata")
  const encriptedData = encryption(apiData);
  // console.log(encriptedData, "encriptedData");
  


  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/shareGroup",
      {
        data: encriptedData,
      },
      {
        headers: UserHeader,
      }
    )
    .then((res) => {
      const decryptedRes = decryption(res?.data?.data);
      // console.log(decryptedRes , "decryptedRes")
      toast.success(decryptedRes.message);
    })
    .catch((err) => {
      const decryptederrr = decryption(err?.response?.data.data);
      // console.log(decryptederrr)
      toast.error(decryptederrr.message);
    });
};
