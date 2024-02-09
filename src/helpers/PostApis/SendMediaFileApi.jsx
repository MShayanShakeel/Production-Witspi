import axios from "axios";
import { UserHeader } from "../Userheader";
import { useState } from "react";

export const handleSendMediaFile = () => {
  cosnt[(selectedFile, setSelectedFile)] = useState(null);

   const handleSendMediaFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

 const handleSendMediaFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(
          `https://watspi-dev-aa7972875395.herokuapp.com/api/users/instanceSendMedia`,
          {
            headers: UserHeader,
          }
        )
        .then((response) => {
          console.log("File Upload Succcesfully!", response.data);
        })
        .catch((error) => {
          console.log("File uploading Error", error);
        });
    }

    else{
        console.warn("No file Selected for upload")
    }
  };
};
