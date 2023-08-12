import { useEffect, useState } from "react";
import Joi, { string } from "joi";
import Img from "../Images/login_crypto.jpg";
import Input, { userInputType } from "./utils/Input";
import { loginApi } from "../api/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorDisplayPage } from "./ErrorDisplayPage";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.state?.path || "/admin/dashboard";

  const [routeError, setRouteError] = useState<boolean>(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const [err, setErr] = useState<userInputType | null>({
    email: "",
    password: "",
  });
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .messages({
        "string.empty": "Email should not be empty",
      }),
    password: Joi.string().messages({
      "string.empty": "Password should not be empty",
    }),
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: Event | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {} as userInputType;
    const { error } = schema.validate(user, { abortEarly: false });
    if (error) {
      for (let index = 0; index < error.details.length; index++) {
        errors[error.details[index].path[0] as keyof typeof user] =
          error.details[index].message;
      }
      return setErr(errors);
    }

    try {
      const response = await loginApi(user);

      if (response.data) {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 50);

        const dataToStore = {
          exp: expirationTime.getTime(),
          data: response.data.token,
        };
        setErr(null);
        sessionStorage.setItem("token", JSON.stringify(dataToStore));
        navigate(locationPath, { replace: true });
      }
    } catch (error: any) {
      console.log(error);

      setErr({
        email: (error.response?.data.message || error.message),
      } as userInputType);
    }
  };
  useEffect(() => {
    if (location.state) {
      setRouteError(true);
      setTimeout(() => {
        setRouteError(false);
      }, 3000);
    }
  }, []);

  return (
    <div className="relative w-full h-screen ">
      {routeError && (
        <ErrorDisplayPage
          color={"text-red-400"}
          message={"Please Login to continue"}
        />
      )}
      <div className="-z-10 absolute w-[100%] h-[100%] opacity-95">
        <img src={Img} alt="" className="w-[100%] h-[100%] bg-no-repeat" />
      </div>
      <div className="w-full flex flex-row justify-start items-center text-white ">
        <div className="p-4 w-[50%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center px-10 py-10 shadow-sm shadow-white bg-black rounded-md"
            action=""
            method="post"
          >
            <div className="w-full">
              <div className="text-3xl font-bold">Sign In</div>
              <div className="font-bold">Please Sign In To Your Account</div>
            </div>
            <Input
              onChange={handleChange}
              label="Email"
              name="email"
              type="text"
              objectValue={user}
            />
            {err?.email && (
              <div className="text-sm text-red-400">{err.email}</div>
            )}
            <Input
              onChange={handleChange}
              label="Password"
              name="password"
              type="text"
              objectValue={user}
            />
            {err?.password && (
              <div className="text-sm text-red-400">{err.password}</div>
            )}
            <div className="font-medium py-2 text-sm cursor-pointer hover:text-[#bd5959]">
              forgot password
            </div>
            <button
              className="bg-yellow-500 w-[50%] py-2 px-3  mt-2 rounded-md font-bold text-lg"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-[50%] text-4xl px-10 font-bold">
          Welcome To <span className="text-[#bd5959]">Osicrypto</span> Exchange
        </div>
      </div>
    </div>
  );
};

export default Login;
