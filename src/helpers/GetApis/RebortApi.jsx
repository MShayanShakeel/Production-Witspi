import axios from "axios";
import { UserHeader } from "./../Userheader";
import { decryption } from "../encryptionDecryption";
import { toast } from "react-toastify";

export const handelRebortApi = async (indiInstanceData) => {
  const url = `https://watspi-dev-aa7972875395.herokuapp.com/api/users/rebootInstance/${indiInstanceData?.idInstance}`;

  try {
    const response = await axios.get(url, {
      headers: UserHeader,
    });
    const decripterdRes = decryption(response?.data?.data);
    console.log(decripterdRes, "runn");
    toast.success(decripterdRes?.message);
    return decripterdRes;
  } catch (err) {
    const decriptedErr = decryption(err.data.data);
    console.log(decriptedErr, "errorr");
    toast.error(decriptedErr?.message);
    return decriptedErr;
  }
};
