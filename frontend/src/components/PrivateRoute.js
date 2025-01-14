import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  console.log("PrivateRoute User State:", user);
                                              
  if (!user) {
    console.log("User not logged in. Redirecting to /login.");
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    console.log(`User does not have required role: ${role}. Redirecting to /`);
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
