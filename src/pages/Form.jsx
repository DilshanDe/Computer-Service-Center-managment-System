import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from './Footer';


const Form = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    appointmentDate: new Date(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      appointmentDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/appointment', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        appointmentDate: new Date(),
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Failed to book appointment. Please try again.',
      });
    }
  };

  return (
    <div className="relative w-[100vw] h-[100vh]">
      
      <Navbar currentPath="/"  /> 

      <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Service Type</label>
            <select
              name="service"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              <option value=" computer repair">Computer Repair</option>
              <option value="laptop repair">Laptop Repair</option>
              <option value="Software repair">Software repair</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Appointment Date</label>
            <DatePicker
              selected={formData.appointmentDate}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              showPopperArrow={false}
              placeholderText="Select date"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
          >
          Book Appointment
          </button>
        </form>
      </div>

      <div className="w-[100vw] h-auto">
        <Footer/>
      </div>

      
    </div>
  );
};

export default Form;

