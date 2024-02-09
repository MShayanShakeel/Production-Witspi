import axios from 'axios';
import { decryption, encryption } from '../encryptionDecryption';
import { UserHeader } from '../Userheader';

async function CreateContactApi(data) {
   
    try {
        console.log('Request Data:', data);
        const encrypted = encryption(data)
        console.log(encrypted, "encrypted data")
        const response = await axios.post(`https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts`,
            { data: encrypted },
            {
              headers: UserHeader,
            });
        console.log(response, "resresresres")
        const decryptedData = await decryption(response?.data?.data);
        console.log(decryptedData, "des")
        return decryptedData;
    } catch (error) {
        console.error('Error From Create Contacts API:', decryption(error));
        return error;
    }
}

export default CreateContactApi;



// import axios from "axios";
// import { UserHeader } from "../Userheader";
// import { decryption, encryption } from "../encryptionDecryption";

//  export const handleAddContactToExcel = () => {
//     const data =  {
//         "firstName": "faraz",
//      "lastName": "Khan",
//      "number":  98989,
//       "status": "yes",
//        "userId":  "6538eb5dfc795f7e6e4dde74",
//     }
//     const encripted = encryption(data);
//     console.log(encripted);
//   axios.post(
//     "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts",{
//         headers : UserHeader,
//     },{
//         data : encripted ,
//     })
//     .then((res) => {
//         const resDecription = decryption(res.data.data);
//         console.log(resDecription , "resDecription");
//         console.log(res.data.data , "res-data");
//     }).catch((err) => {
//         const errDecription = decryption(err.response.data.data);
//         console.log(errDecription , "errDecription");
//         console.log(err.response.data.data , "err-resp")
//     })
// };