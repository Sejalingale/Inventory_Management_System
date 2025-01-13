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
            <div className="card">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "black" }}
              >
                Information
              </div>
              <div className="card-body">
                <marquee behavior="" direction="">
                  <h3 className="my-4">
                    {lowStockProducts.length > 0
                      ? lowStockProducts
                          .map(
                            (product) =>
                              `${product.name} (Stock: ${product.stock})`
                          )
                          .join(" | ")
                      : "All stocks are sufficient!"}
                  </h3>
                </marquee>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div
                className="card-header  text-white"
                style={{ backgroundColor: "black" }}
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
                        <h4>
                          Staff <i className="fas fa-users"></i>
                        </h4>
                        <h3>4</h3>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link
                      className="text-decoration-none text-dark"
                      to="/product"
                    >
                      <div className="card my-card shadow text-center p-3">
                        <h4>
                          Products <i className="fas fa-box"></i>
                        </h4>
                        <h3>4</h3>
                      </div>
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link
                      className="text-decoration-none text-dark"
                      to="/order"
                    >
                      <div className="card my-card shadow text-center p-3">
                        <h4>
                          Orders <i className="fas fa-shipping-fast"></i>
                        </h4>
                        <h3>4</h3>
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
