import React, { useState, useEffect } from "react";
import axios from "axios";
import Topnav from "./Topnav";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductCRUD() {
  const [products, setProducts] = useState([]); // Store product list
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
  }); // Store form inputs

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/product/"); // Adjust the URL
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/product/", formData); // Adjust the URL
      fetchProducts(); // Refresh the product list
      setFormData({ name: "", quantity: "", category: "" }); // Clear the form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/product/${id}/`);
        fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
    
     const navigate = useNavigate();

     const handleEdit = (id) => {
       navigate(`/edit/${id}`);
     };


    return (
      <div>
        <Navbar />
        <Topnav />
        <div className="container">
          <div className="row my-4">
            {/* Form to Add Products */}
            <div className="col-md-3">
              <div
                className=" p-3"
                style={{
                  border: "1px solid #ddd", // Light border
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow
                  borderRadius: "8px", // Optional: adds rounded corners for better appearance
                  backgroundColor: "#b3b3ff",
                }}
              >
                <h4>Add Products</h4>
                <hr />
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Supplier</label>
                      <input
                        type="text"
                        className="form-control"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Expiration date</label>
                      <input
                        type="text"
                        className="form-control"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Threshold</label>
                      <input
                        type="number"
                        className="form-control"
                        name="threshold"
                        value={formData.threshold}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <input
                    className="btn  btn-block"
                    type="submit"
                    value="Add Product"
                    style={{ backgroundColor: " #4d79ff" }}
                  />
                </form>
              </div>
            </div>

            {/* Product Table */}
            <div className="col-md-9">
              <table
                className="table "
                style={{
                  border: "4px solid #ddd", // Light border
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Light shadow
                  borderRadius: "8px", // Optional: adds rounded corners for better appearance
                  backgroundColor: "#b3b3ff",
                }}
              >
                <thead className="bg-info">
                  <tr className="text-white">
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Supplier</th>
                    <th scope="col">Expiration</th>
                    <th scope="col">Threshold</th>
                    <th scope="col">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.sku}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.supplier}</td>
                      <td>{product.expiration_date}</td>
                      <td>{product.threshold}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm mr-3"
                          style={{ backgroundColor: " #4d79ff" }}
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
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
