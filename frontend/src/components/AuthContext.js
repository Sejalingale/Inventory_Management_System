import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

const login = (token) => {
localStorage.setItem("token", token);
const decoded = parseJWT(token);
setUser({ username: decoded.username, role: decoded.is_staff ? "Admin" : "Viewer" });
}


const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
};

const parseJWT = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
};

return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};