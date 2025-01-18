import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear the error message when the user starts typing
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

      // Fetch user data to check if they are admin or staff
      const userResponse = await axios.get(
        "http://127.0.0.1:8000/api/user-role/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const isAdmin = userResponse.data.role === "Admin";

      // Navigate to the appropriate page
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/viewer_index");
      }
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row g-0 ">
          {/* First Card */}
          <div className="col-12 col-md-6 my-5">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <div className="text-center my-5" style={{ color: "#884dff" }}>
                  <h2> Welcome to the inventory!</h2>
                </div>
                <img
                  src="https://img.freepik.com/premium-photo/smiling-woman-giant-cellphone-with-mockup-screen-female-client-holding-smartphone-with-blank-display-advertising_379823-9420.jpg"
                  alt="login image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-12 col-md-6 my-5">
            <div className="card h-100 shadow-lg">
              <div className="card-body align-items-center justify-content-center p-5 my-5">
                <div className="text-center my-2" style={{ color: "#884dff " }}>
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

                  {/* Error message */}
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="container my-2 pl-5 pr-5">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#884dff" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="container my-3 text-center">
                  <p>
                    Don't have an account?{" "}
                    <a href="/register" style={{ color: "#884dff" }}>
                      Register here
                    </a>
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
