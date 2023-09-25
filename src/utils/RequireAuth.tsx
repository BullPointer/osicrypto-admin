import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const RequireAuth = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const date = new Date();
  const storedData = localStorage.getItem("token");

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    const expiredDate = new Date(parsedData.exp);
    const currentDate = new Date();

    if (currentDate > expiredDate) {
      return <Navigate to={"/"} state={{ path: location.pathname }} />;
    } else {
      return children;
    }
  } else {
    return <Navigate to={"/"} />;
  }
};
