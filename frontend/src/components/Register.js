import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    is_admin: false,
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message on input change
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );

      // Set success message
      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage("");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      // Handle registration errors
      setSuccessMessage(""); // Clear success message
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row g-0">
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <div className="text-center my-5" style={{ color: "#884dff" }}>
                  <h2>You need an account First!</h2>
                </div>
                <img
                  src="https://img.freepik.com/premium-photo/student-with-pencil-lecture-hall-is-taking-notes-pad_287270-2012.jpg?semt=ais_hybrid"
                  alt="login image"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          {/* Second Card */}
          <div className="col-12 col-md-6">
            <div className="card h-100 shadow-lg">
              <div className="card-body align-items-center justify-content-center p-5 my-5">
                <div className="text-center my-2" style={{ color: "#884dff" }}>
                  <h2>Register here</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 pl-5 pr-5">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter your username"
                      id="username"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 pl-5 pr-5">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 pl-5 pr-5">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      placeholder="Enter your email id "
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      name="is_admin"
                      id="is_admin"
                      className="form-check-input ml-3"
                      style={{
                        border: "2px solid #884dff", // Dark blue border
                        borderRadius: "4px", // Optional: rounding the corners
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, is_admin: e.target.checked })
                      }
                    />
                    <label className="form-check-label ml-5" htmlFor="is_admin">
                      Admin?
                    </label>
                  </div>

                  <div className="container my-2 pl-5 pr-5">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ backgroundColor: "#884dff" }}
                    >
                      Register
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="container my-3 text-center">
                  <p>
                    Go back to{" "}
                    <a href="/" style={{ color: "#884dff" }}>
                      login
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
};

export default Register;
