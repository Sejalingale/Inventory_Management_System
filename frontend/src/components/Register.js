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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      alert(response.data.message);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row g-0">
          {" "}
          {/* Use Bootstrap grid */}
          {/* First Card */}
          <div className="col-12 col-md-6">
            {" "}
            {/* Full width on small screens, half on medium and larger */}
            <div className="card h-100">
              {" "}
              {/* Ensure cards take full height */}
              <div className="card-body">
                <div className="text-center my-5" style={{ color: "#000957" }}>
                  <h2>You need an account First!</h2>
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
            {" "}
            {/* Full width on small screens, half on medium and larger */}
            <div className="card h-100">
              <div className="card-body  align-items-center justify-content-center p-5 my-5">
                <div className="text-center my-2" style={{ color: "#000957" }}>
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

                  <div className="mb-3 form-check ">
                    <input
                      type="checkbox"
                      name="is_admin"
                      id="is_admin"
                      className="form-check-input ml-3 "
                      style={{
                        border: "2px solid #007bff" /* Dark blue border */,
                        borderRadius:
                          "4px" /* Optional: rounding the corners */,
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, is_admin: e.target.checked })
                      }
                    />
                    <label className="form-check-label ml-5 " htmlFor="is_admin">
                      Admin?
                    </label>
                  </div>

                  <div className="container my-2 pl-5 pr-5">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
                <div className="container my-3 text-center">
                  <p>
                    Go back to <a href="/">login</a>
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


 