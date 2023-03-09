import React from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../app/features/auth/authSlice";
import { PrimaryButton } from "../../components";

export default function Login() {
  const dispatch = useDispatch();
  const doLogin = () => {
    let token = true;
    dispatch(setAuthToken(token));
    localStorage.setItem("user", token);
  };
  return ( 
    <PrimaryButton onClick={doLogin} title="Sign In" varient="primary" />  
  );
}
