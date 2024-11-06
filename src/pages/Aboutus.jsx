import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from './Footer';
import '../styles/card.css'

const Aboutus = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div className="relative">
     
      <Navbar currentPath="aboutus"  /> 
      
      {/* Sections with Framer Motion animations */}
      <motion.section
        className="container mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
          <h2 className="text-9xl font-bold text-gray-800 mb-1 heebo-font">Who</h2>

            <h3 className='text-7xl font-bold text-gray-800 mb-1 heebo-font'> We</h3>
            <h3 className='text-7xl font-bold text-gray-800 mb-1 heebo-font'>Are ?</h3> 
            <p className="text-lg font-bold text-gray-800 mb-4 fontFamily: Nunito Sans">
            At BEEZ COMPUTER, we are a trusted computer service shop offering expert repairs, upgrades, and IT solutions. Our skilled technicians handle everything from hardware fixes to virus removal, ensuring your devices run smoothly. With a focus on customer satisfaction, we provide reliable, affordable service to meet all your tech needs.
             </p>
            
          </div>
          <motion.div
            initial={{ scale: 0}}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <div className="relative">
              <img src="https://i.postimg.cc/pLMdZCyH/R-4.jpg" alt="Who We Are" className="w-full h-auto rounded-md shadow-md" />
            </div>
          </motion.div> 
          
        </div>
      </motion.section>

      <motion.section
        className="bg-gray-200 py-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 text-white p-8 shadow-md card1 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">OUR VISION</h3>
            <p className="text-lg fontFamily: Nunito Sans">
              To be the most trusted and innovative computer service center, delivering exceptional technical support and solutions that empower individuals and businesses to achieve their full potential through seamless technology.
            </p>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-3xl shadow-md card1">
            <h3 className="text-2xl font-bold mb-4">OUR MISSION</h3>
            <p className="text-lg fontFamily: Nunito Sans ">
              To provide reliable, efficient, and customer-focused computer repair and maintenance services that ensure the longevity and optimal performance of our clients' technology. We aim to build long-term relationships by offering high-quality, cost-effective solutions while continuously adapting to the evolving needs of our customers in a rapidly changing digital world.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer/>
    </div>
  );
};

export default Aboutus;
