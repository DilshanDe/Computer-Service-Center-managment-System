import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const RepairedItems = () => {
  const [repairedProducts, setRepairedProducts] = useState([]);

  useEffect(() => {
    const fetchRepairedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/repairedproducts');
        setRepairedProducts(response.data);
      } catch (error) {
        console.error('Error fetching repaired products', error);
      }
    };

    fetchRepairedProducts();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Repaired Items</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>NIC</th>
                <th>Product Name</th>
                <th>Model</th>
                <th>Repair Description</th>
                <th>Total Amount</th>
                <th>Bill</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {repairedProducts.length > 0 ? (
                repairedProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.mobile}</td>
                    <td>{product.nic}</td>
                    <td>{product.productName}</td>
                    <td>{product.model}</td>
                    <td>{product.repairDescription}</td>
                    <td>RS {product.totalAmount.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-success mt-3">
                        Bill
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-success mt-3">
                        Delivered
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">No Repaired Items</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RepairedItems;