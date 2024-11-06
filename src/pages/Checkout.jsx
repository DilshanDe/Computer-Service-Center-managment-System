import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/checkout.css'

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const subTotal = cart.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseInt(product.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const shippingFee = 500; // Shipping fee for delivery
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('pickup');
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const total = selectedShippingMethod === 'delivery' ? subTotal + shippingFee : subTotal;

  const handleShippingChange = (event) => {
    setSelectedShippingMethod(event.target.value);
  };

  const handleInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.id]: e.target.value,
    });
  };

  const validateBillingDetails = () => {
    const { firstName, lastName, phone, email, address, city, state, zip } = billingDetails;
    
    if (!firstName || !lastName || !phone || !email || !address || !city || !state || !zip) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all the required fields.',
      });
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return false;
    }

    if (phone.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number.',
      });
      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateBillingDetails()) {
      return; // Stop if validation fails
    }

    const orderData = {
      cart,
      subTotal,
      shippingFee: selectedShippingMethod === 'delivery' ? shippingFee : 0,
      total,
      shippingMethod: selectedShippingMethod,
      shippingAddress: billingDetails,
    };

    try {
      await axios.post('http://localhost:5000/api/order', orderData);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: 'Your order has been placed successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: 'There was an error placing your order. Please try again.',
      });
    }
  };

  return (
    <div className='bb'>
    <div 
      className="container"
      
    >
      <div className="row">
        {/* Billing Details */}
        <div className="col-md-6">
          <div className="p-4 border rounded-lg shadow-sm mb-4" style={{ backgroundColor: 'rgba(211, 211, 211, 0.8)' }}
          >
            <h4 className="mb-3"><b>Billing Details</b></h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName" className="form-label"><b>First Name</b></label>
                  <input type="text" className="form-control border-primary" id="firstName" value={billingDetails.firstName} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName" className="form-label"><b>Last Name</b></label>
                  <input type="text" className="form-control border-primary" id="lastName" value={billingDetails.lastName} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label"><b>Phone</b></label>
                <input type="text" className="form-control border-primary" id="phone" value={billingDetails.phone} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"><b>Email Address</b></label>
                <input type="email" className="form-control border-primary" id="email" value={billingDetails.email} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label"><b>Address</b></label>
                <input type="text" className="form-control border-primary" id="address" value={billingDetails.address} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label"><b>Town / City</b></label>
                <input type="text" className="form-control border-primary" id="city" value={billingDetails.city} onChange={handleInputChange} required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="state" className="form-label"><b>State</b></label>
                  <input type="text" className="form-control border-primary" id="state" value={billingDetails.state} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="zip" className="form-label"><b>Postal Code</b></label>
                  <input type="text" className="form-control border-primary" id="zip" value={billingDetails.zip} onChange={handleInputChange} required />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="p-4 border rounded-lg shadow-sm mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h4 className="mb-3"><b>Order Summary</b></h4>
            <ul className="list-group mb-3">
              {cart.map((product, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
                    <h6 className="my-0">{product.name}</h6>
                    <small className="text-muted"><b>Quantity: </b>{product.quantity}</small>
                  </div>
                  <span className="text-muted"><b>RS. </b>{(product.price * product.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span><b>Sub Total</b></span>
                <strong><b>RS. </b>{subTotal.toFixed(2)}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span><b>Shipping</b></span>
                <strong>{selectedShippingMethod === 'delivery' ? `RS. ${shippingFee.toFixed(2)}` : 'FREE'}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span><b>Total</b></span>
                <strong><b>RS. {total.toFixed(2)}</b></strong>
              </li>
            </ul>
          </div>

          {/* Shipping Method */}
          <div className="p-4 border rounded-lg shadow-sm mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <h4 className="mb-3"><b>Shipping Method</b></h4>
            <div className="mb-3">
              <div className="form-check">
                <input 
                  id="pickup" 
                  name="shippingMethod" 
                  type="radio" 
                  className="form-check-input border-primary" 
                  value="pickup" 
                  checked={selectedShippingMethod === 'pickup'}
                  onChange={handleShippingChange}
                />
                <label className="form-check-label" htmlFor="pickup">
                  <b> Pick up in Store (Free)</b>
                </label>
              </div>
              <div className="form-check mt-2">
                <input 
                  id="delivery" 
                  name="shippingMethod" 
                  type="radio" 
                  className="form-check-input border-primary" 
                  value="delivery" 
                  checked={selectedShippingMethod === 'delivery'}
                  onChange={handleShippingChange}
                />
                <label className="form-check-label" htmlFor="delivery">
                  <b>Cash On Delivery (RS. {shippingFee.toFixed(2)})</b>
                </label>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg btn-block mt-4 shadow-lg" 
              onClick={handleSubmitOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Checkout;
