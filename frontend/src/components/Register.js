import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    is_admin: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Admin?</label>
        <input
          type="checkbox"
          name="is_admin"
          onChange={(e) =>
            setFormData({ ...formData, is_admin: e.target.checked })
          }
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
