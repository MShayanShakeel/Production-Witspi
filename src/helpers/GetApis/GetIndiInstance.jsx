import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function GetIndiInstance(indiInstance) {
  try {
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/users/getInstancebyid/${indiInstance}`;
    console.log(url);

    const response = await axios.get(url, {
      headers: UserHeader,
    });
    const resData = decryption(response?.data?.data);

    console.log(resData , "resDataaa") ;
    return resData;
  } catch (error) {
    console.error('Error fetching data at GetIndi Instance:', error);
    return [];
  }
}

export default GetIndiInstance;
