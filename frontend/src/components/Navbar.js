import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to the login page
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: "#884dff" }}>
            Gen Inventory
          </a>
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
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                  style={{ color: "#884dff" }}
                >
                  Dashboard
                </a>
              </li>
             
            </ul>
            <div className="d-flex align-items-center">
             
              <button
                className="btn btn-outline me-3"
                type="button"
                onClick={handleLogout}
                style={{ color: "#884dff" }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
