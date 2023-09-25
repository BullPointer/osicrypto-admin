/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getSupportByIdApi } from "./supportApi";

const useToken = () => {
  const storedData = sessionStorage.getItem("token");
  if (storedData) {
    const token = JSON.parse(storedData).data;
    return token;
  }
  return "";
};

export const createChatApi = async (cred: any, id: string) => {
  const formData = new FormData();
  formData.append("msg", cred.response);
  formData.append("fromAdmin", "true");
  formData.append("status", cred.status.toUpperCase());
  if (cred.file.length > 0) {
    formData.append("fileImage", cred.file, cred.file.name);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Important for sending files
      Authorization: `Bearer ${useToken()}`,
    },
  };


  const response = await axios.patch(
    `https://osicrypto-backend.onrender.com/api/supports/make-chat/${id}`,
    formData,
    config
  );

  // const response = await axios.patch(
  //   `http://localhost:3000/api/supports/make-chat/${id}`,
  //   formData,
  //   config
  // );

  return response;
};
