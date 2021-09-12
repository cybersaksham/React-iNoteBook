import React, { useContext } from "react";
import AlertContext from "../Context/Alert/AlertContext";

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>
            {String(
              alert.type.charAt(0).toUpperCase() + alert.type.slice(1)
            ) === "Danger"
              ? "Error"
              : "Success"}
          </strong>
          {": "} {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
