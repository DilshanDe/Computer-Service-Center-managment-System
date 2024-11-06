import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const RepairAndBilling = () => {
  const { state } = useLocation();
  const { repair } = state;
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [total, setTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the latest repair details from the database
  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/repairs/${repair._id}`);
        const fetchedRepair = response.data;
        setItems(fetchedRepair.billItems || []);
        setTotal(fetchedRepair.totalAmount || 0);
      } catch (error) {
        console.error('Error fetching repair data', error);
        // Optionally handle errors, e.g., show a message or log
      }
    };

    fetchRepairData(); // Call the function to fetch data on component load
  }, [repair._id]);

  // Function to calculate the updated total
  const calculateTotal = (updatedItems) => {
    return updatedItems.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);
  };

  // Handle adding item and price
  const handleAddItem = async () => {
    if (newItem && newPrice) {
      const updatedItems = [...items, { item: newItem, price: parseFloat(newPrice) }];
      const newTotal = calculateTotal(updatedItems);

      try {
        // Send PUT request to update the bill in the database
        await axios.put(`http://localhost:5000/api/repairs/${repair._id}`, {
          billItems: updatedItems,
          totalAmount: parseFloat(newTotal),
          status: 'repairing',
        });

        // Update local state with new item and total
        setItems(updatedItems);
        setTotal(newTotal);
        setNewItem('');
        setNewPrice('');
      } catch (error) {
        console.error('Error adding item to bill', error);
        // Optionally handle errors, e.g., show a message or log
      }
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const newTotal = calculateTotal(updatedItems);

    try {
      // Send PUT request to update the bill in the database
      await axios.put(`http://localhost:5000/api/repairs/${repair._id}`, {
        billItems: updatedItems,
        totalAmount: parseFloat(newTotal),
        status: 'repairing',
      });

      // Update local state with the updated items and total
      setItems(updatedItems);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error deleting item from bill', error);
      // Optionally handle errors, e.g., show a message or log
    }
  };

  const handleRepairCompleted = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`http://localhost:5000/api/repairs/${repair._id}/complete`);
      navigate('/repaireditems');  // Navigate to the Repaired Items page
    } catch (error) {
      console.error('Error completing repair', error);
      // Optionally handle errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">Repair and Billing</h2>

        {/* Repair details */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Repair Details</h5>
            <p><strong>Name:</strong> {repair.name}</p>
            <p><strong>Mobile No:</strong> {repair.mobile}</p>
            <p><strong>Email:</strong> {repair.email}</p>
            <p><strong>NIC:</strong> {repair.nic}</p>
            <p><strong>Product Name:</strong> {repair.productName}</p>
            <p><strong>Model:</strong> {repair.model}</p>
            <p><strong>Repair Description:</strong> {repair.repairDescription}</p>
            <p><strong>Acceptance Date:</strong> {new Date(repair.acceptanceDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Billing form */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add Items to Bill</h5>
            <div className="form-group mb-3">
              <label>Item Name</label>
              <input
                type="text"
                className="form-control"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>

        {/* Display added items and total */}
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Bill Summary</h5>
            {items.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td>RS.{item.price.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>RS.{total}</strong></td>
                    <td></td> {/* Empty cell for alignment */}
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>No items added to the bill yet.</p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          className="btn btn-success mt-3"
          onClick={handleRepairCompleted}
          disabled={isSubmitting}
        >
          Repair Completed
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default RepairAndBilling;