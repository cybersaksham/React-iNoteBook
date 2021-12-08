import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const { showAlert } = useContext(AlertContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    showAlert("success", "Logged Out Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <>
              <Link className="mx-1 btn btn-outline-primary" to="/login">
                Login
              </Link>
              <Link className="mx-1 btn btn-outline-primary" to="/signup">
                SignUp
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="mx-1 btn btn-outline-danger"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
