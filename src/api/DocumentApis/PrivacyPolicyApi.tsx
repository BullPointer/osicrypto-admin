import axios from "axios";
import { faqInputType } from "../../components/utils/Input";

export const getAll = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/api/privacy-policy"
  );
  // const response = await axios.get("http://localhost:3000/api/privacy-policy");
  return response;
};
export const getByIdApi = async (id: string) => {
  const response = await axios.get(
    `https://osicrypto-backend.onrender.com/api/privacy-policy/${id}`
  );
  // const response = await axios.get(
  //   `http://localhost:3000/api/privacy-policy/${id}`
  // );
  return response;
};

const storedData = localStorage.getItem("token");

const useToken = () => {
  if (storedData) {
    const token = JSON.parse(storedData).data;
    return token;
  }
  return "";
};

export const editOrCreate = async (cred: any, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "application/json",
    },
  };

  const response: any = await axios.patch(
    `https://osicrypto-backend.onrender.com/api/privacy-policy/?id=${id}`,
    JSON.stringify(cred),
    config
  );
  // const response: any = await axios.patch(
  //   `http://localhost:3000/api/privacy-policy/?id=${id}`,
  //   JSON.stringify(cred),
  //   config
  // );

  return response;
};

export const deleteByIdApi = async (id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.delete(
    `https://osicrypto-backend.onrender.com/api/privacy-policy/${id}`,
    config
  );
  // const response = await axios.delete(
  //   `http://localhost:3000/api/privacy-policy/${id}`,
  //   config
  // );
  return response;
};
