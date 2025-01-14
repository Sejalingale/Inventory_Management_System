import React from "react";
import Index from "./components/Index";
import Staff from "./components/Staff";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Order from "./components/Order";
import Loginpage from "./components/Loginpage";
import Register from "./components/Register";
import EditProduct from "./components/EditProduct";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./components/AdminPage";
import ViewerPage from "./components/ViewerPage";
import { AuthProvider } from "./components/AuthContext";


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute role="Admin">
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/viewer"
              element={
                <PrivateRoute role="Viewer">
                  <ViewerPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
