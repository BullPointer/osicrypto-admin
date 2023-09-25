import axios from "axios";
import { blogInputType } from "../components/utils/Input";

export const getBlogsApi = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/api/blogs"
  );
  // const response = await axios.get("http://localhost:3000/api/blogs");
  return response;
};
export const getBlogByIdApi = async (id: string) => {
  const response = await axios.get(
    `https://osicrypto-backend.onrender.com/api/blogs/${id}`
  );
  // const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
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

export const createBlogApi = async (cred: blogInputType) => {
  const formData = new FormData();
  formData.append("title", cred.title);
  formData.append("subtitle", cred.subtitle);
  formData.append("notes", cred.notes);
  formData.append("author", cred.author);
  formData.append("category", cred.category);
  formData.append("blogImage", cred.blogImage);

  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "multipart/form-data", // Important for sending files
    },
  };

  const response: any = await axios.post(
    "https://osicrypto-backend.onrender.com/api/blogs",
    formData,
    config
  );
  // const response: any = await axios.post(
  //   "http://localhost:3000/api/blogs",
  //   formData,
  //   config
  // );

  return response;
};

export const editByIdApi = async (cred: blogInputType, id: string) => {
  const formData = new FormData();
  for (const key in cred) {
    formData.append(key, cred[key as keyof blogInputType]);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "multipart/form-data", // Important for sending files
    },
  };

  const response: any = await axios.patch(
    `https://osicrypto-backend.onrender.com/api/blogs/${id}`,
    formData,
    config
  );
  // const response: any = await axios.patch(
  //   `http://localhost:3000/api/blogs/${id}`,
  //   formData,
  //   config
  // );

  return response;
};

export const deleteByIdApi = async (id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "multipart/form-data", // Important for sending files
    },
  };

  const response = await axios.delete(
    `https://osicrypto-backend.onrender.com/api/blogs/${id}`,
    config
  );
  // const response = await axios.delete(
  //   `http://localhost:3000/api/blogs/${id}`,
  //   config
  // );
  return response;
};
