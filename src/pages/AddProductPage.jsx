import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    imageUrl: '',
    name: '',
    description: '',
    price: '',
    type: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setProduct(prev => ({ ...prev, price: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/AddProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        title: 'Product Added!',
        text: 'The product has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/adminproduct'); // Navigate after success
      });
    })
    .catch(error => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add product. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <div>
    <AdminNavbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Add New Product</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                  <div
                    className="image-preview-placeholder border border-primary p-4"
                    style={{ cursor: 'pointer', borderRadius: '10px' }}
                    onClick={() => document.getElementById('imageUpload').click()}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="img-fluid" style={{ borderRadius: '10px' }} />
                    ) : (
                      <>
                        <FaImage size={50} color="#007bff" />
                        <p className="mt-2 text-muted">Click to choose an image</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handlePriceChange}
                    required
                    pattern="^\d+(\.\d{1,2})?$"
                    title="Please enter a valid price"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Type</label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={product.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="RAM">RAM</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Laptop">Laptop</option>
                    <option value="SSD">SSD</option>
                    <option value="Hard-Disk">Hard-Disk</option>
                  </select>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary me-3">Add Product</button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AddProductPage;
