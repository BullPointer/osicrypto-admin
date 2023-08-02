import axios from "axios";

type LoginCred = {
  email: string;
  password: string;
};
export const loginApi = async (cred: LoginCred) => {
  const response = await axios.post(
    "http://localhost:3000/admin-panel/users/login",
    {
      email: cred.email,
      password: cred.password,
    }
  );
  return response;
};

type SignupCred = {
  email: string;
  password: string;
  username: string;
};
export const signupApi = async (cred: SignupCred) => {
  const response = await axios.post(
    "http://localhost:3000/admin-panel/users/signup",
    {
      email: cred.email,
      password: cred.password,
      username: cred.username,
    }
  );
};
