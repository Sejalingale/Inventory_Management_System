import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Topnav() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    // Fetch low stock products from the API
    const fetchLowStockProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/stock-alerts/"
        );
        setLowStockProducts(response.data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching low stock products:", error);
      }
    };

    fetchLowStockProducts();
  }, []); // Run only once on component mount

  return (
    <div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow-lg">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#8080ff" }}
              >
                <strong>ALERT !</strong>
              </div>
              <div className="card-body">
                <marquee behavior="" direction="">
                  <h3 className="my-4">
                    {lowStockProducts.length > 0
                      ? lowStockProducts
                          .map(
                            (product) =>
                              `${product.name} (Low Stock: ${product.quantity})`
                          )
                          .join(" | ")
                      : "All stocks are sufficient!"}
                  </h3>
                </marquee>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div
                className="card-header  text-white"
                style={{ backgroundColor: "#8080ff" }}
              >
                Statistics
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <Link
                      className="text-decoration-none text-dark"
                      to="/staff"
                    >
                      <div className="card my-card shadow text-center p-3">
                        <h4 style={{ color: " #3333ff" }}>Staff</h4>
                        <h4>
                          <i
                            className="fas fa-users"
                            style={{ color: " #3333ff" }}
                          ></i>
                        </h4>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link
                      className="text-decoration-none text-dark"
                      to="/product"
                    >
                      <div className="card my-card shadow text-center p-3">
                        <h4 style={{ color: " #3333ff" }}>Products</h4>
                        <h4>
                          {" "}
                          <i
                            className="fas fa-box"
                            style={{ color: " #3333ff" }}
                          ></i>
                        </h4>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link
                      className="text-decoration-none text-dark"
                      to="/order"
                    >
                      <div className="card my-card shadow text-center p-3">
                        <h4 style={{ color: " #3333ff" }}> Orders</h4>
                        <h4>
                          <i
                            className="fas fa-shipping-fast"
                            style={{ color: " #3333ff" }}
                          ></i>
                        </h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
