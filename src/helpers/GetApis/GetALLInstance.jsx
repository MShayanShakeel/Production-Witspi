import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetALLInstances(userId) {
  try {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/users/getinstance/${userId}`;
    console.log(url);

    const response = await axios.get(url, {
      headers: UserHeader,
    });
    console.log(response, "response")
    const resData = decryption(response?.data?.data);
    
    console.log(resData);
    return resData;
  } catch (error) {
    console.log('Error fetching data at Get ALL Instance', decryption(error.response.data.data));
    return error;
  }
}

export default GetALLInstances;
