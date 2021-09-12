import React from "react";
import { useHistory } from "react-router";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const HOST = "http://localhost:5000/api/auth";

  const checkRequest = useRequest();
  const history = useHistory();

  // Logging In
  const loginUser = async ({ email, password }) => {
    const response = await fetch(HOST + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    checkRequest(response.status, json.error, "Logged in successfully", () => {
      history.push("/");
      localStorage.setItem("token", JSON.stringify(json.authToken));
    });
  };

  return (
    <AuthContext.Provider value={{ loginUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
