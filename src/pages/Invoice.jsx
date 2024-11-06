import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from './Footer';

const Invoice = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="relative">
      
      <Navbar currentPath="invoice" /> 
      
      <div>Invoice</div>

      <Footer/>
    </div>
  );
};

export default Invoice;
