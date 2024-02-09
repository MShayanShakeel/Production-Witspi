import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetIndiContacts() {
  try {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getcontact/123`;
    console.log(url);

    const response = await axios.get(url, {
      headers: UserHeader,
    });
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.error('Error fetching data at Get Indi Contacts:', error);
    return error;
  }
}

export default GetIndiContacts;
