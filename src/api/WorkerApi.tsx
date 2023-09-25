import axios from "axios";
import { faqInputType } from "../components/utils/Input";

export const getWorkersApi = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/admin-panel/users"
  );
  // const response = await axios.get("http://localhost:3000/admin-panel/users");
  return response;
};
export const getWorkersByIdApi = async (id: string) => {
  const response = await axios.get(
    `https://osicrypto-backend.onrender.com/admin-panel/users/${id}`
  );
  // const response = await axios.get(`http://localhost:3000/admin-panel/users/${id}`);
  return response;
};
const storedData = sessionStorage.getItem("token");

const useToken = () => {
  if (storedData) {
    const token = JSON.parse(storedData).data;
    return token;
  }
  return "";
};

export const createWorkerApi = async (cred: faqInputType) => {
  const faqData = {
    question: cred.question,
    type: cred.type,
    status: cred.status,
    answer: cred.answer,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "application/json",
    },
  };

  const response: any = await axios.post(
    "https://osicrypto-backend.onrender.com/admin-panel/users",
    JSON.stringify(faqData),
    config
  );
  // const response: any = await axios.post(
  //   "http://localhost:3000/admin-panel/users",
  //   JSON.stringify(faqData),
  //   config
  // );

  return response;
};

export const editByIdApi = async (cred: faqInputType, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "application/json",
    },
  };

  const response: any = await axios.patch(
    `https://osicrypto-backend.onrender.com/admin-panel/users/${id}`,
    JSON.stringify(cred),
    config
  );
  // const response: any = await axios.patch(
  //   `http://localhost:3000/admin-panel/users/${id}`,
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
    `https://osicrypto-backend.onrender.com/admin-panel/users/${id}`,
    config
  );
  // const response = await axios.delete(
  //   `http://localhost:3000/admin-panel/users/${id}`,
  //   config
  // );
  return response;
};
