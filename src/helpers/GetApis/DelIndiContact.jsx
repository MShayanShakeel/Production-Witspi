import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function DelIndiContact(id) {
  try {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/deleteContact/${id}`;
    console.log('API URL:', url);

    const response = await axios.delete(url, {
      headers: UserHeader,
    });
    console.log('Delete Instance API Response:', response);
    const resData = decryption(response?.data?.data);

    console.log(resData);
    return resData;
  } catch (error) {
    console.log('Error At Deleting Instance, testing:', decryption(error.response.data.data));
    return error;
  }
}

export default DelIndiContact;
