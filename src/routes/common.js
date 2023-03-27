import { Navigate } from "react-router-dom";
import { Login } from "../pages";

export const REDIRECT_TO_LOGIN = () => {
  return [
    {
      path: "/*",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
      exact: true,
    },
  ];
};
// Testing
export const REDIRECT_TO_DASHBOARD = (userType) => {
  return [
    {
      path: "/",
      element:
        userType === 1 ? (
          <Navigate to="/dashboard" />
        ) : (
          <Navigate to="/cpanel" />
        ),
    },
    {
      path: "/login",
      element:
        userType === 1 ? (
          <Navigate to="/dashboard" />
        ) : (
          <Navigate to="/cpanel" />
        ),
      exact: true,
    },
  ];
};
