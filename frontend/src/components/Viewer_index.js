import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import Viewer_navbar from './Viewer_navbar';


export default function Viewer_index() {
  const [product, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    oder_quantity: "",
  });

  //fetching the  products here
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/");
        setProducts(response.data);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };

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

    fetchProducts();
    fetchOrders();
  }, []);

  //handling form submission here
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      alert(response.data.message);
      // Refresh orders after submission
      const ordersResponse = await axios.get(
        "http://127.0.0.1:8000/api/orders/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Viewer_navbar/>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">Make Request</div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product</label>
                  <select
                    className="form-control"
                    name="product"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a product</option>
                    {product.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (Available: {product.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Order Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="order_quantity"
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  className="btn btn-info btn-block"
                  type="submit"
                  value="Make Request"
                />
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Orders Records</div>
            <div class="card-body">
              <table class="table bg-white">
                <thead class="bg-info text-white">
                  <tr>
                    <th scope="col">Product</th>

                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.product_name}</td>
                      
                      <td>{order.order_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
