import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const RepairQueue = () => {
  const [repairs, setRepairs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/repairs');
        // when the check box is clicked it comes first
        const sortedRepairs = response.data.sort((a, b) => b.priority - a.priority);
        setRepairs(sortedRepairs);
      } catch (error) {
        console.error('Error fetching repairs', error);
      }
    };
  
    fetchRepairs();
  }, []);
  

  // Handle the repair button click and update status to 'Repairing'
  const handleRepairClick = async (repair) => {
    try {
      // Update the status to 'Repairing' in the database
      await axios.put(`http://localhost:5000/api/repairs/${repair._id}/status`);

      navigate('/repair&billing', { state: { repair } });
    } catch (error) {
      console.error('Error updating repair status', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Repair Queue</h2>
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
                <th>Acceptance Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {repairs.length > 0 ? (
                repairs.map((repair) => (
                  <tr key={repair._id}>
                    <td>{repair.name}</td>
                    <td>{repair.email}</td>
                    <td>{repair.mobile}</td>
                    <td>{repair.nic}</td>
                    <td>{repair.productName}</td>
                    <td>{repair.model}</td>
                    <td>{repair.repairDescription}</td>
                    <td>{new Date(repair.acceptanceDate).toLocaleDateString()}</td>
                    <td>{repair.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleRepairClick(repair)}
                      >
                        Repair
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">No Repairs in Queue</td>
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

export default RepairQueue;