import React from "react";
import Dashboard from "./components/Dashboard";
import Staff from "./components/Staff";
import Index from "./components/Index"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Order from "./components/Order";
import Loginpage from "./components/Loginpage";
import Register from "./components/Register";
import EditProduct from "./components/EditProduct";

import { AuthProvider } from "./components/AuthContext";
import Viewer_index from "./components/Viewer_index";


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/product" element={<Product />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/viewer_index" element={<Viewer_index />} />

            
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
