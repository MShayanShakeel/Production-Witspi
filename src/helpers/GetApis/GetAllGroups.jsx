import axios from 'axios';
import { decryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
import { useUserdetails } from '../../store/UserContext';
async function GetAllGroupsApi() {

    const { userDetails, setUserDetails } = useUserdetails();
    console.log(userDetails, "userdetailscontext");
    const userId = userDetails?._id;

    if(userDetails?._id){
    try {
        let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getAllGroups/${userId}`;
        
        console.log(url);



        const response = await axios.get(url, {
            headers: UserHeader,
        });
        console.log(response, "response")
        const data = response.data;
        const decryptedData = data.map(item => decryption(item.data));

        console.log(decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching data at GetAllGroupsApi:', decryption(error?.response?.data?.data));
        return error;
    }
}}

export default GetAllGroupsApi;
