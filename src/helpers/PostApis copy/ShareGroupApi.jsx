import axios from "axios";
import { decryption, encryption } from "../encryptionDecryption";
import { UserHeader } from "../Userheader";

export const handleShareGroup = (
  selectedGroup,
  selectedRole,
  apiResponce
) => {
  const data = {
    groupId: selectedGroup?._id,
    contactID: selectedGroup?.contactList,
    role: selectedRole,
    sharedWith: apiResponce.data[0]._id,
  };

  const encriptedData = encryption(data);
  console.log(encriptedData, "encriptedData");
  console.log(data, "Data");

   axios
    .post(
      "https://watspi-dev-aa7972875395.herokuapp.com/api/contact/shareGroup",
      {
        data: encriptedData,
      },
      {
        headers: UserHeader,
      }
    )
    .then((res) => {
      console.log(res?.data?.data, "resres");
      const decryptedRes = decryption(res?.data?.data);
      console.log(decryption(res?.data?.data), "decript data new pass");
      alert(`${decryptedRes.message}`);
      toast.success("Goup Share");

    })
    .catch((err) => {
      const decryptederr = decryption(err?.response?.data?.data);
      console.log(decryptederr.message, "jkcjahcas");
      alert(`${decryptederr.message}`);
    });
};
