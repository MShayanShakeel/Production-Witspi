import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";
async function UpdateGroupApi(data) {
  try {
    console.log("Request Data:", data);
    const encrypted = encryption(data);
    console.log(encrypted, "encrypted data");
    const response = await axios.post(
      `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/updateGroup`,
      { data: encrypted },
      {
        headers: UserHeader,
      }
    );
    // console.log(response?.data?.data, "resp");
    const decryptedData = await decryption(response?.data?.data);
    console.log(decryptedData, "Updated res at Group");
    return decryptedData;
  } catch (error) {
    // console.log(error);
    console.error(
      "Error From update Group API:",
      decryption(error?.response?.data?.data)
    );
    return error;
  }
}

export default UpdateGroupApi;
