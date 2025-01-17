import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to the token endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        credentials
      );

      // Extract tokens from the response
      const { access, refresh } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Update global authentication state
      login(access);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row g-0">
          {/* First Card */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <div className="text-center my-5" style={{ color: "#000957" }}>
                  <h2> Welcome to the inventory!</h2>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="login image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body align-items-center justify-content-center p-5 my-5">
                <div className="text-center my-2" style={{ color: "#000957" }}>
                  <h2>Login here</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 pl-5 pr-5">
                    <label className="form-label">Username</label>
                    <input
                      className="form-control"
                      placeholder="name"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 pl-5 pr-5">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      placeholder="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container my-2 pl-5 pr-5">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
                <div className="container my-3 text-center">
                  <p>
                    Don't have an account? <a href="/register">Register here</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
