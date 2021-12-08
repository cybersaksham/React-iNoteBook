import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({ type: type, msg: msg });
    if (localStorage["alertTime"] != null) clearTimeout(localStorage["alertTime"]);
    let s = setTimeout(() => {
      setAlert(null);
    }, 2000);
    localStorage["alertTime"] = s;
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
