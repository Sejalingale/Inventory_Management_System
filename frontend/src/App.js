import React from "react";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import Staff from "./components/Staff";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Order from "./components/Order";
import Loginpage from "./components/Loginpage";
import Register from "./components/Register";


function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
