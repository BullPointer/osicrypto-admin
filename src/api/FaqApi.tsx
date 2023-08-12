import axios from "axios";
import { faqInputType } from "../components/utils/Input";

export const getFaqsApi = async () => {
  const response = await axios.get("http://localhost:3000/api/faqs");
  return response;
};
export const getFaqByIdApi = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/api/faqs/${id}`);
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

export const createFaqApi = async (cred: faqInputType) => {
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
    "http://localhost:3000/api/faqs",
    JSON.stringify(faqData),
    config
  );

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
    `http://localhost:3000/api/faqs/${id}`,
    JSON.stringify(cred),
    config
  );

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
    `http://localhost:3000/api/faqs/${id}`,
    config
  );
  return response;
};
