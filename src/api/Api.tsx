import axios from "axios";

type LoginCred = {
  email: string;
  password: string;
};
export const loginApi = async (cred: LoginCred) => {
  const response = await axios.post(
    "https://osicrypto-backend.onrender.com/admin-panel/users/login",
    {
      email: cred.email,
      password: cred.password,
    }
  );
  // const response = await axios.post(
  //   "http://localhost:3000/admin-panel/users/login",
  //   {
  //     email: cred.email,
  //     password: cred.password,
  //   }
  // );
  return response;
};

type SignupCred = {
  email: string;
  password: string;
  username: string;
};
export const signupApi = async (cred: SignupCred) => {
  const response = await axios.post(
    "https://osicrypto-backend.onrender.com/admin-panel/users/signup",
    {
      email: cred.email,
      password: cred.password,
      username: cred.username,
    }
  );
  // const response = await axios.post(
  //   "http://localhost:3000/admin-panel/users/signup",
  //   {
  //     email: cred.email,
  //     password: cred.password,
  //     username: cred.username,
  //   }
  // );
};

export const visitorsApi = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/api/visitors/get"
  );
  // const response = await axios.get("http://localhost:3000/api/visitors/get");
  return response;
};

export const workersApi = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/admin-panel/users"
  );
  // const response = await axios.get("http://localhost:3000/admin-panel/users");
  return response;
};

export const usersApi = async () => {
  const response = await axios.get(
    "https://osicrypto-backend.onrender.com/users"
  );
  // const response = await axios.get("http://localhost:3000/users");
  return response;
};
