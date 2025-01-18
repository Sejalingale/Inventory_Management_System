import React from 'react'
import Topnav from "./Topnav";
import Navbar from './Navbar';
import { useState, useEffect } from "react";
import axios from "axios"

export default function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.log("error fetching orders : ", error);
      }
    };
     fetchOrders();
  }, []);


  return (
    <div>
      <Navbar />
      <Topnav />
      <div className="container">
        <div className="row my-4">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <table
              className="table bg-white"
              style={{
                border: "4px solid #dcdcdc", // Light border color
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow
                borderRadius: "8px", // Optional: rounded corners for better appearance
              }}
            >
              <thead className="bg-info">
                <tr className="text-white">
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Orderd by</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product_name}</td>
                    <td>{order.order_quantity}</td>
                    <td>{order.staff_name}</td>
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
