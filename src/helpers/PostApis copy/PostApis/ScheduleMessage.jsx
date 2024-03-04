import axios from "axios";
import { decryption, encryption } from "../../encryptionDecryption";
import { UserHeader } from "../../Userheader";

export const handleScheduleMessage = (
  sendMessageInstance,
  instanseId,
  fatchContactId,
  selectedData,
  userId,
  setShowSendMessageModal,
) => {
  const data = {
    message: sendMessageInstance,
    date: selectedData,
    idInstance: instanseId,
    userId: userId,
    contactId: fatchContactId,
  };
  console.log(data, "data");

  const encripterdata = encryption(data);
  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/users/schedulesendMessage",
      {
        data: encripterdata,
      },
      {
        headers: UserHeader,
      }
    )
    .then((res) => {
      console.log(res, "1255");
      const decryptedRes = decryption(res?.data?.data);
      console.log(decryptedRes, "res");
      setShowSendMessageModal(false);
      setSendMessageInstance("");
    })
    .catch((err) => {
      const decryptedErr = decryption(err.data);
      console.log(decryptedErr, "dec");
      console.log(err, "pop");
    });
};
