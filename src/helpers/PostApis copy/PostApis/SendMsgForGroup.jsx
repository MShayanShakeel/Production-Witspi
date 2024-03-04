import axios from "axios";
import { UserHeader } from "../../Userheader";
import { decryption, encryption } from "../../encryptionDecryption";
import { toast } from "react-toastify";

export const handleSendMessageForGroup = async (
  sendMessageInstance,
  instanseId,
  fatchGroupId,
  userId
) => {
  try {
    const data = {
      idInstance: instanseId,
      message: sendMessageInstance,
      groupId: fatchGroupId,
      user: userId,
    };

    const encripteddata = encryption(data);

    const response = await axios.post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/sendMessageGroup",
      {
        data: encripteddata,
      },
      {
        headers: UserHeader,
      }
    );

    const decriptedData = decryption(response?.data?.data);
    console.log(decriptedData, "res inside");
    toast.success(decriptedData.message);
    setSendMessageInstance("");
  } catch (error) {
    const decriptionErr = decryption(error?.data?.data);
    console.log(decriptionErr, "decription Error");
    console.log(error.data.data, "err Data");
    console.log(error.message, "ataaaa");
    toast.error(decriptionErr.message);
  }
};
