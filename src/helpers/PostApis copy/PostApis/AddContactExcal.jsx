import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";
import { toast } from "react-toastify";
import { useUserdetails } from "../../store/UserContext";

const { userDetails, setUserDetails } = useUserdetails();
const  userId = userDetails?._id;


export const handleSave = () => {
  const contactsData = [{
    firstName: firstName,
    lastName: lastName,
    number: contactNumber,
    age: age,
    gender: gender,
    email: email,
    country: country,
    userId: userId,
  }];

  const encrypted = encryption(contactsData);

  axios
    .post(
      'https://watspi-dev-aa7972875395.herokuapp.com/api/contact/createContacts',
      { data: encrypted }, // Corrected: Pass the data directly, no need for an additional object
      {
        headers: UserHeader,
      }
    )
    .then(async (res) => {
      const deccriptioneres = await decryption(res.data.data)
      console.log(decryption(res.data.data));
      console.log(deccriptioneres , "deccriptioneres")
      toast.success("Contact created!");
      setFirstName(""),
        setLastName(""),
        setAge(""),
        setGender(""),
        setContactNumber(""),
        setCountry(""),
        setEmail(""),
        setTags([""]);
    })
    .catch((err) => {
      const decriptionerr = decryption(err?.response?.data?.data)
      console.log(decryption(err.response.data.data));
      toast.error(decryption(err.response.data.data).message);
      console.log(response , "decriptionerr")
    });
};
