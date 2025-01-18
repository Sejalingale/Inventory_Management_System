import React, { useState, useEffect } from "react";
import Topnav from "./Topnav";
import Navbar from "./Navbar";
import axios from "axios";

export default function Staff() {
  const [users, setUsers] = useState([]);

  // Fetching users who are not admins
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`, // Ensure the token is correct
          },
        });
        console.log(response.data);
        // Filter users who are not admins
        const nonAdminUsers = response.data.filter((user) => !user.is_staff);
        setUsers(nonAdminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Topnav />
      <div className="container">
        <div className="row my-2">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <table
              className="table bg-white"
              style={{
                border: "4px solid #ddd",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <thead style={{ backgroundColor: "black" }}>
                <tr className="text-white">
                  <th scope="col">First Name</th>

                  <th scope="col">Email ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
