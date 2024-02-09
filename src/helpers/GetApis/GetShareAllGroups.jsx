import axios from "axios";
import { UserHeader } from "../Userheader";
import { decryption } from "../encryptionDecryption";

export const handleGetAllGroups = async () => {
    try{
    let url = `https://watspi-dev-aa7972875395.herokuapp.com/api/contact/getGroup/65a90d2c52683a10c79ded0c/655f083d62799e77a89eb377`;
    const responce = await axios.get(url , {
        headers : UserHeader,
    })
    const decriptedRes = decryption(responce.data.data)
    console.log(decriptedRes , "get share Group");
    // 6579892e6148cccf6d76804f

    return decriptedRes ;
}
catch(err){
    const decriptedErr = decryption(err.responce.data.data)
    console.log(decriptedErr , "get share err")
}

}