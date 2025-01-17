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
        <div className="row my-4">
          <div className="col-md-8"></div>
          <div className="col-md-8">
            <table className="table bg-white">
              <thead style={{ backgroundColor: "black" }}>
                <tr className="text-white">
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>

                  <th scope="col">Email ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">
                      <a
                        className="btn btn-sm text-white"
                        href=""
                        style={{ backgroundColor: "black" }}
                      >
                        View
                      </a>
                    </th>
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
