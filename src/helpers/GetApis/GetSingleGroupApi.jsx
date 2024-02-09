import axios from "axios";
import { UserHeader } from "../Userheader";
import { decryption } from "../encryptionDecryption";

export const handleGetSingleGroup = async (groupId) => {
    
    try {
        if (!groupId) {
            throw new Error("groupId is undefined");
        }

      console.log(groupId , "groupgroup");
    let url =`https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getSingleGroup/${groupId}`;
    const responce = await axios.get(url, {

      headers: UserHeader,
    });
    const decriptedRes = decryption(responce?.data?.data);
    console.log(decriptedRes.message, "decriptedresponce");
    return decriptedRes ;
  } 
  catch (err) {
    const decriptedErr = decryption(err?.data?.data);
    console.log(decriptedErr, "decriptedderror");
    return decriptedErr ;
    
  }
};
