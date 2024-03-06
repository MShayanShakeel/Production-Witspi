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
  const currentDate = new Date(selectedData);

  // Format the date to "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split("T")[0];

  // Format the time to "HH:mm"
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("Formatted Date:", formattedDate);
  console.log("Formatted Time:", formattedTime);

  const numbers = getAllContactStore.map((entry) => entry?.number);
  const arrayData = Object.values(templates).map((obj) => obj.textMessage);
  const tempNotEmptyString = arrayData.filter((temp) => temp !== "");

  const data = {
    userId: userDetails?._id,
    message: tempNotEmptyString,
    date: formattedDate,
    time: formattedTime,
    // contactId: numbers,
    contactId: ["923480288071", "923302567670"],
    idInstance: ["1101885009"],
    broadCastName: inputValue,
  };

  //   userId: "65c25bf63b37221f955e8bc9",
  //   message: [
  //     "My Name Is Unique API",
  //     "how is going your Life",
  //     "I am 200 years old",
  //     "from broad cast",
  //   ],
  //   date: "2024-03-05",
  //   time: "19:30",
  //   contactId: [
  //     "655f4b8f6f37e49c6638d343",
  //     "656d9b50e0a01c2c3d0a0bc0",
  //     "656eee3d8ebf5f35647c4b3e",
  //   ],
  //   idInstance: ["1101885009"],
  //   broadCastName: "from broad cast",
  // };
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
      // const decriptedRes = decryption(res?.data?.data);
      console.log(res, "decriptedRes");
    })
    .catch((err) => {
      // const decriptedErr = decryption(err?.response?.data?.data);
      console.log(err, "decriptedErr");
    });
};
