import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { FaBox, FaReceipt, FaWrench, FaEnvelope, FaCalendarAlt, FaShoppingCart, FaUserPlus } from 'react-icons/fa'; // Import icons

const Admin = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Define a common card style with color and hover effects
  const cardStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    height: '10rem',
    border: '1px solid #ddd',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const hoverEffect = {
    transform: 'scale(1.05)',
  };

  const titleStyle = {
    color: '#4e73df',
    fontWeight: 'bold',
  };

  const textStyle = {
    color: '#858796',
  };

  const iconStyle = {
    fontSize: '2rem',
    color: '#4e73df',
    marginBottom: '10px',
  };

  // Background style: dark gradient
  const backgroundStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1c1c1c, #2e2e2e, #4e4e4e)',
    padding: '20px',
  };

  return (
    <div>
    <AdminNavbar />
    <div style={backgroundStyle}>
     

      <div className="container mt-5">
        <h2 className="text-center text-primary mb-5" style={{ fontWeight: 'bold', fontSize: '40px', color: '#fff' }}>Admin Dashboard</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <Link to="/adminproduct" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaBox style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Add New Product</h5>
                <p className="card-text" style={textStyle}>Manage products in the store.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/adminappoiment" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaCalendarAlt style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Customer Booking</h5>
                <p className="card-text" style={textStyle}>Manage customer appointments.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/admincontact" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaEnvelope style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Customer Messages</h5>
                <p className="card-text" style={textStyle}>View customer inquiries.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/adminorders" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaShoppingCart style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Orders</h5>
                <p className="card-text" style={textStyle}>Track customer orders.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/addrepairpage" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaWrench style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Add Repair Items</h5>
                <p className="card-text" style={textStyle}>Log repair services provided.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/repairqueue" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaBox style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Repair Queue</h5>
                <p className="card-text" style={textStyle}>View the repair</p>
              </div>
            </Link>
          </div>
          <div className="col-md-4 mb-4">
            <Link to="/repair&billing" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaReceipt style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>RepairAndBilling</h5>
                <p className="card-text" style={textStyle}>Generate invoices for purchases.</p>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-4">
            <Link to="/repaireditems" className="card text-center shadow-sm" style={cardStyle} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaBox style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Repaired Items</h5>
                <p className="card-text" style={textStyle}>View the Repaired Items</p>
              </div>
            </Link>
          </div>
          
          
          
          

          {/* Align Register Admin to Left */}
          <div className="col-md-4 mb-4"> {/* Full width column */}
            <Link to="/adminregister" className="card text-center shadow-sm" style={{ ...cardStyle, marginLeft: 'auto', marginRight: '0' }} onMouseOver={(e) => e.currentTarget.style = { ...cardStyle, ...hoverEffect }} onMouseOut={(e) => e.currentTarget.style = cardStyle}>
              <div className="card-body">
                <FaUserPlus style={iconStyle} /> {/* Icon */}
                <h5 className="card-title" style={titleStyle}>Register Admin</h5>
                <p className="card-text" style={textStyle}>Add new admin users.</p>
              </div>
            </Link>
          </div>
          
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default Admin;

