import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
    sku: "",
    price: "",
    supplier: "",
    expiration_date: "",
    threshold:"",
  });

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/${id}/`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/product/${id}/`, formData);
      navigate("/product"); // Redirect to the product list page
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div
          className="col-md-6 offset-md-3 p-3 bg-white"
          style={{
            border: "4px solid #ddd", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
            borderRadius: "8px",
            backgroundColor: " #b3b3ff", 
          }}
        >
          <h3>Edit Product</h3>
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
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formData.quantity}
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
              <label>Price</label>
              <input
                type="text"
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
              <label>Expiration</label>
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
                type="text"
                className="form-control"
                name="threshold"
                value={formData.threshold}
                onChange={handleInputChange}
              />
            </div>

            <input
              className="btn btn-info"
              style={{ backgroundColor: " #4d79ff" }}
              type="submit"
              value="Confirm"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
