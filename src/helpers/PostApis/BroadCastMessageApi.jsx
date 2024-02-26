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

  const data = {
    // messages: ["hello beta", "bolo beta", "testing"],
    // idInstance: ["1101906427"],
    // contacts: ["923480288071", "923302567670"],
    // broadCastName: "broad cast single message",
    messages: [templates],
    idInstance: ["1101885009"],
    contacts: [numbers],
    broadCastName: inputValue,
  };

  console.log(data, UserHeader, "data");
  const encriptedData = encryption(data);
  console.log(encriptedData);

  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/broadCastSingleMessage",
      //   {
      //       headers : UserHeader
      //     },
      {
        data: encriptedData,
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
