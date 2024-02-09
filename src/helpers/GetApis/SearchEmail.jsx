import axios from "axios"
import { UserHeader } from "../Userheader"
import { decryption } from "../encryptionDecryption"
import { toast } from "react-toastify"

export const  HandleSearchEmailShareGroup = async (emailFind) => {


console.log(emailFind , "emailSearchemailSearch")
// console.log(token , "tokennnn")
try {
const response = await axios.get(`https://watspi-dev-aa7972875395.herokuapp.com/api/contact/search/${emailFind}` ,
    {
        headers: UserHeader,
    })
    const decryptedData = decryption(response.data.data);
    console.log(decryption(response.data.data) , "ksjjvhwki")
    return decryption(response.data.data);
    // .then((response) => {
    //     console.log(response , "Responce")
    //     if (response && response.data) {
    //         const decryptedData = decryption(response.data.data);
    //         console.log(decryptedData , "decrypted message");
    //         console.log(decryption(response.data.data) , "ksjjvhwki")
    //         return decryption(response.data.data);
           
    //         toast.success("user Found Succesfull")
           
    //     } else {
    //         console.error("Invalid response structure:", responce);
    //     }
    // })
}
catch(err) {
    
        console.log(err.message , "Error")
        console.log(err.response , "Er")
        if (err.response && err.response.data.data) {
            const decryptedError = decryption(err.response.data.data);
            console.log(decryptedError, "decrypted error");
            console.log(err.response.data, "error response data");
           
        } else {
            console.error("Invalid error response structure:", err);
        }
    }
    
}