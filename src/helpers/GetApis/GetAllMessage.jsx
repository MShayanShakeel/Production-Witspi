import axios from "axios";
import { UserHeader } from "../Userheader";
import { decryption } from "../encryptionDecryption";


export const GetAllMessagesData = async (userId) => {
  const url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getUserMessages/${userId}/10/1`;

  try {
      const response = await axios.get(url, {
        headers: UserHeader,
      });

      const decriptedRes = decryption(response?.data?.data);
      console.log(decriptedRes, "responseee")

      return decriptedRes;
  } catch (err) {
    const decriptedErr = decryption(err?.data?.data);
    return decriptedErr;
  }
};


