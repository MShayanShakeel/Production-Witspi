import axios from 'axios';
import { decryption, encryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';
async function CreateContactApi(data) {
    try {
        console.log('Request Data:', data);
        const encrypted = encryption(data)
        console.log(encrypted, "encrypted data")
        const response = await axios.post(`https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContact`,
            { data: encrypted },
            {
              headers: UserHeader,
            });
        console.log(response, "res")
        const decryptedData = await decryption(response?.data?.data);
        console.log(decryptedData, "des")
        return decryptedData;
    } catch (error) {
        console.error('Error From Create Contacts API:', decryption(error));
        return error;
    }
}

export default CreateContactApi;
