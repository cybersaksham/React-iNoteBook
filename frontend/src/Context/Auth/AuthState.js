import React from "react";
import { useHistory } from "react-router-dom";
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

  // Registering
  const registerUser = async ({ name, email, password, cPassword }) => {
    if (password === cPassword) {
      const response = await fetch(HOST + "/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error,
        "Logged in successfully",
        () => {
          history.push("/");
          localStorage.setItem("token", JSON.stringify(json.authToken));
        }
      );
    } else {
      checkRequest(404, "Passwords do not match", "", () => {});
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
