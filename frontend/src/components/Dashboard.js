import React, { useState, useEffect } from "react";
import axios from "axios"; // For API requests
import Topnav from "./Topnav";
import Navbar from "./Navbar";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts";

export default function Dashboard() {
  // Function to handle CSV download
  const handleDownload = () => {
    window.location.href = "http://127.0.0.1:8000/api/generate-csv/";
  };

  const [products, setProducts] = useState([]);

  // Fetch the products data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/");
        setProducts(response.data); // Assuming response.data contains the list of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Prepare data for PieChart based on fetched product data
  const pieChartData = products.map((product) => ({
    id: product.id,
    value: product.quantity, // Assuming the product object has 'quantity'
    label: product.name, // Assuming the product object has 'name'
  }));

  return (
    <div>
      <Navbar />
      <Topnav />
      {/* add charts here */}
      <div className="container d-flex  ">
        <div className="col-md-4 my-5">
          <div className="card shadow-lg">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#8080ff" }}
            >
              Inventory Report
            </div>
            <div className="card-body">
              <p>
                Get a detail report of all the items present in your inventory
                currently.
              </p>
              <p>Click on the download button below to download the report.</p>
              <button
                className="btn btn"
                type="button" // Change to type="button" to prevent form submission
                onClick={handleDownload} // Trigger CSV download when clicked
                style={{ backgroundColor: " #3333ff", color: "white" }}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="card my-4 ml-5 shadow-lg">
            
            <div className="container my-5 d-flex justify-content-center align-items-center">
              <PieChart
                series={[{ data: pieChartData }]}
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
