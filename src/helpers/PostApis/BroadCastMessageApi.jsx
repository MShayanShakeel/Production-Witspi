import axios from "axios";
import { UserHeader } from "../Userheader";
import { decryption, encryption } from "../encryptionDecryption";
import { toast } from "react-toastify";

export const handleBroadCastapi = (
  inputValue,
  templates,
  getAllContactStore
  //   selectedInstanceIds
) => {
  const numbers = getAllContactStore.map((entry) => entry?.number);

  const arrayData = Object.values(templates).map((obj) => obj.textMessage);
  const tempNotEmptyString = arrayData.filter((temp) => temp !== "");
  console.log(tempNotEmptyString, "tempstring");
  
  const data = {
    messages: tempNotEmptyString,
    idInstance: ["1101885009"],
    // contacts: [numbers],
    contacts: ["923480288071", "923302567670"],
    broadCastName: inputValue,
  };

  console.log(data);
  const encriptedData = encryption(data);
  console.log(encriptedData, "excriptdeata");

  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/broadCastSingleMessage",
      {
        data: encriptedData,
      },
      {
        headers: UserHeader,
      }
    )
    .then((res) => {
      const decriptedRes = decryption(res.data.data);
      console.log(decriptedRes, "decriptedRes");
      toast.success(encriptedData?.message);
    })
    .catch((err) => {
      const decriptedErr = decryption(err.response.data.data);
      console.log(decriptedErr, "decriptedErr");
      toast.error(encriptedData?.message);
    });
};
