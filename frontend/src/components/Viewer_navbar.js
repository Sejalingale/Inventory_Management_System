import React from 'react'
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Viewer_navbar() {

    const { logout } = useContext(AuthContext);
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
          <a className="navbar-brand" href="#">
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
              
             
            </ul>
            <div className="d-flex">
              <button
                className="btn  me-3"
                type="button" // Change to "button" to prevent form submission
                onClick={handleLogout} // Call handleLogout on click
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
