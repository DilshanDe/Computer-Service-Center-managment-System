import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from './Footer';

const Contactus = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contactNo: '',
    message: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: response.data.message,
        confirmButtonText: 'OK'
      });
      setFormData({
        name: '',
        email: '',
        address: '',
        contactNo: '',
        message: ''
      });
    } catch (error) {
      console.error('There was an error sending the message!', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Message',
        text: 'Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <div>
      <Navbar currentPath="contactus"  /> 

      <Container fluid className="map-section p-0">
        <Row className="gx-0">
          <Col xs={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.618571412929!2d79.84331527482264!3d6.936108093063862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25926b6df0efb%3A0x9b5520a057b38707!2sMetropolitan%20Campus%20KDU!5e0!3m2!1sen!2slk!4v1724825585378!5m2!1sen!2slk"
              width="100%"
              height="350"
              style={{ border: 2 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-5" style={{ backgroundColor: '#fff' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontFamily: 'Nunito Sans', color: '#2E4F4F', fontSize: 30 }}>
          GET IN TOUCH WITH US
        </h2>
        <p className="text-center mb-5" style={{ fontWeight: 'bold', fontFamily: "Nunito Sans", color: '#2E4F4F', fontSize: 15 }}>
          You are more than welcome to leave your contact info and we will be in touch shortly
        </p>
        <Row className="justify-content-center">
          <Col lg={7} md={12} className="p-4" style={{ backgroundColor: '#CBE4DE', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', textAlign: 'left' }}>
            <h3 className="mb-4 font-bold text-lg" >
              CONTACT US FORM
            </h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName" className="mb-3">
                    <Form.Label><strong>Name</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-1"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label><strong>Email Address</strong></Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-1"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formAddress" className="mb-3">
                    <Form.Label><strong>Address</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="rounded-1"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formContactNo" className="mb-3">
                    <Form.Label><strong>Contact No</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Contact No"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="rounded-1"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formMessage" className="mb-3 h-80">
                    <Form.Label><strong>Message</strong></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-1"
                      style={{ height: '70%' }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="dark" type="submit" className="rounded-1 float-end" style={{ backgroundColor: '#2C3333' }}>
                SEND MESSAGE
              </Button>
            </Form>
          </Col>
          
          <Col lg={4} md={12} className="p-4 bg-[#2C3333] rounded-br-[20px] rounded-tr-[20px] text-white">
            <h4 className="mb-2" style={{ fontWeight: 'bold' }}>ADDRESS</h4>
            <p>No: 03,<br/>Times Building,<br/> Sir Razik Fareed Mawatha,<br/> Colombo, Sri Lanka</p>
            <hr className="mt-3" style={{ backgroundColor: '#ffffff' }} />
            <h4 className="mb-2 mt-2" style={{ fontWeight: 'bold', fontSize: 15 }}>HOT LINE</h4>
            <p>071-5386140<br />078-2354765</p>
            <hr className="mt-3" style={{ backgroundColor: '#ffffff' }} />
            <h4 className="mb-2 mt-2" style={{ fontWeight: 'bold', fontSize: 15 }}>E - MAIL</h4>
            <p>beezcomputers@gmail.com</p>
            <hr className="mt-3" style={{ backgroundColor: '#ffffff' }} />
          </Col>
        </Row>
      </Container>

      <Footer/>
    </div>
  );
};

export default Contactus;
