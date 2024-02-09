import axios from "axios";
import { UserHeader } from "../../Userheader";
import { decryption, encryption } from "../../encryptionDecryption";
import { toast } from "react-toastify";

export const handleSendMessageInstance = (
  sendMessageInstance,
  instanseId,
  fatchContactId,
  userId,
  setShowSendMessageModal,
  setSendMessageInstance
) => {
  const data = {
    message: sendMessageInstance,
    idInstance: instanseId,
    contactId: fatchContactId,
    user: userId,
  };
  console.log(data, "meg send");

  const encrypted = encryption(data);
  console.log(encrypted, "encrypteda");
  axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/contactSendMessage",
      {
        data: encrypted,
      },
      {
        headers: UserHeader,
      }
    )
    .then((res) => {
      const resDecription = decryption(res?.data?.data);
      console.log(resDecription, "resDecription");
      toast.success(resDecription?.message);
      setShowSendMessageModal(false);
      setSendMessageInstance("");
    })
    .catch((err) => {
      // const responceData = err?.response?.data;
      const errDecription = decryption(err?.data?.data);
      console.log(errDecription, "errdecription");
      // console.log(errDecription?.message, "errordecriptiion message");
      toast.error("Message not send!");
    });
};
