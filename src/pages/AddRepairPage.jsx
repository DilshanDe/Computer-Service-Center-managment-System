import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const AddRepairPage = () => {
  const [repair, setRepair] = useState({
    name: '',
    email: '',
    nic: '',
    mobile: '',
    productName: '',
    model: '',
    repairDescription: '',
    acceptanceDate: '',
    priority: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepair({
      ...repair,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/repairs', repair);
      Swal.fire({
        icon: 'success',
        title: 'Repair Added',
        text: response.data.message,
        confirmButtonText: 'OK'
      });
      setRepair({
        name: '',
        email: '',
        nic: '',
        mobile: '',
        productName: '',
        model: '',
        repairDescription: '',
        acceptanceDate: '',
        priority: false
      });
    } catch (error) {
      console.error('There was an error sending the message!', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Repair',
        text: 'Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen bg-light">
      <AdminNavbar />
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow-lg bg-white p-4 w-100" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-4">
            <h2 className="card-title">Add New Repair</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control border border-primary"
                id="name"
                name="name"
                value={repair.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">User Email</label>
              <input
                type="email"
                className="form-control border border-primary"
                id="email"
                name="email"
                value={repair.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="mobile" className="form-label">Mobile No</label>
                <input
                  type="number"
                  className="form-control border border-primary"
                  id="mobile"
                  name="mobile"
                  value={repair.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="nic" className="form-label">NIC No</label>
                <input
                  type="text"
                  className="form-control border border-primary"
                  id="nic"
                  name="nic"
                  value={repair.nic}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="productName" className="form-label">Name of Product</label>
                <input
                  type="text"
                  className="form-control border border-primary"
                  id="productName"
                  name="productName"
                  value={repair.productName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="model" className="form-label">Model of Product</label>
                <input
                  type="text"
                  className="form-control border border-primary"
                  id="model"
                  name="model"
                  value={repair.model}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="repairDescription" className="form-label">Repair Description</label>
              <textarea
                className="form-control border border-primary"
                id="repairDescription"
                name="repairDescription"
                value={repair.repairDescription}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="acceptanceDate" className="form-label">Acceptance Date</label>
              <input
                type="date"
                className="form-control border border-primary"
                id="acceptanceDate"
                name="acceptanceDate"
                value={repair.acceptanceDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input border border-primary"
                id="priority"
                name="priority"
                checked={repair.priority}
                onChange={(e) => setRepair({ ...repair, priority: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="priority">
                Customer has Booked
              </label>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-2">Add Repair</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRepairPage;
