import axios from "axios";
import { decryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";
import {useUserdetails} from "../../store/UserContext"
// import GetAllContacts from './GetAllContacts';

function GetAllContacts(userId) {

  // const { userDetails, setUserDetails } = useUserdetails();

  let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getAllContacts/${userId}`;
  console.log("urlwithidcheck", userId);

  return axios
    .get(url, {
      headers: UserHeader,
    })
    .then((response) => {
      console.log(response, "response");
      const resData = decryption(response?.data?.data);
      console.log(resData);
      return resData;
    })
    .catch((error) => {
      console.error(
        "Error fetching data at GetAllContacts:",
        decryption(error.response.data.data)
      );
      throw error; // Re-throw the error to be caught by the calling code
    });
}

export default GetAllContacts;
