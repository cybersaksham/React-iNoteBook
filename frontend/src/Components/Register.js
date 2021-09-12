import React, { useState, useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const { registerUser } = useContext(AuthContext);

  const handleSignup = (e) => {
    e.preventDefault();
    registerUser(credentials);
  };

  const handleChange = () => {
    setCredentials({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      cPassword: document.getElementById("cpassword").value,
    });
  };

  return (
    <div className="container my-3">
      <h2>Register to use iNoteBook</h2>
      <hr />
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={credentials.name}
            onChange={handleChange}
            type="name"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={credentials.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={credentials.cPassword}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm password"
          />
        </div>
        <button
          type="submit"
          disabled={credentials.password !== credentials.cPassword}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
