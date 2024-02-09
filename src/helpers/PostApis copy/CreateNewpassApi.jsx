import axios from "axios"
import { decryption, encryption } from "../encryptionDecryption"
import { toast } from "react-toastify";

export const HandleCreateNewPassword = (createNewPassword , createConfirmPassword  ,email , token) =>{
    console.log("handle ran")

    const data = {
        email : email , 
        newPassword : createNewPassword  , 
        confirmPassword : createConfirmPassword,
        token : token ,
    }

    const encrypted = encryption (data);
    console.log(data ,"excelEncriptedexcelEncripted")
    console.log(encrypted, "excelEncripted");

    axios.post('https://watspi-dev-aa7972875395.herokuapp.com/api/users/resetPassword', {
        data : encrypted , 
    }).then(async (responce) => {
        const decriptedRes = await decryption(responce?.data?.data);
        console.log(decryption(responce.data.data))
        toast.success(decriptedRes.message)
        console.log(responce , "699163")
    }).catch((err) => {
        const decriptederr = decryption(err?.responce.data?.data);
        console.log(decryption(err.responce.data.data))
        toast.error(`${decriptederr.message}`);
        console.log(decriptederr , "699163699163")
    })
}