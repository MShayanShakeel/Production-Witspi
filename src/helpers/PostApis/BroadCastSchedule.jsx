import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";

export const handleBroadCastSchedule = (
  inputValue,
  templates,
  getAllContactStore,
  selectedInstanceIds,
  userDetails,
  selectedData
) => {
  const numbers = getAllContactStore.map((entry) => entry?.number);
  const data = {
    userId: userDetails?._id,
    message: [templates],
    date: "2024-02-23",
    time: "18:45",
    contactId: [numbers],
    idInstance: ["1101885009"],
    broadCastName: inputValue,
  };
  //     userId: " 65c25bf63b37221f955e8bc9",
  //     message: [
  //       "My Name Is Unique API",
  //       "how is going your Life",
  //       "I am 200 years old",
  //       "from broad cast",
  //     ],
  //     date: "2024-02-23",
  //     time: "18:45",
  //     contactId: [
  //       "655f265c990490b0300efe1e",
  //       "656f2d19b772ca8450b21213",
  //       "656de1bdea8240e66d1b79cb",
  //       "656eee3d8ebf5f35647c4b3e",
  //     ],
  //     idInstance: ["1101885009"],
  //     broadCastName: "from broad cast",
  //   };
  console.log(data);
  const encriptedData = encryption(data);
  console.log(encriptedData);

  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/broadCastScheduleSendMessage",
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
    })
    .catch((err) => {
      const decriptedErr = decryption(err.response.data.data);
      console.log(decriptedErr, "decriptedErr");
    });
};
