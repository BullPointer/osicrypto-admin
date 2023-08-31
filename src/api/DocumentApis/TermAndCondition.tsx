import axios from "axios";

export const getAll = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/term-and-condition"
  );
  return response;
};
export const getByIdApi = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/term-and-condition/${id}`
  );
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

export const editOrCreate = async (cred: any, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${useToken()}`,
      "Content-Type": "application/json",
    },
  };

  const response: any = await axios.patch(
    `http://localhost:3000/api/term-and-condition/?id=${id}`,
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
    `http://localhost:3000/api/term-and-condition/${id}`,
    config
  );
  return response;
};
