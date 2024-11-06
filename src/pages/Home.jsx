import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { FaPhoneAlt, FaClock} from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/home.css';
import '../styles/overly.css';
import Navbar from '../pages/Navbar';  
import Footer from './Footer';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);


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
  const [showMore, setShowMore] = useState(false);

const handleReadMoreClick = () => {
  setShowMore(!showMore);
};


  return (
    <div className="relative">
     
     <Container
      fluid
      className="bg-light py-4"
      style={{
        maxWidth: '100%',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Row className="align-items-center">
        {/* BEEZ COMPUTER SERVICE  */}
        <Col xs={12} md={4} className="text-md-left text-center mb-2 mb-md-0">
          <h1 className="m-0" style={{ fontSize: '2.2rem', fontWeight: 'bold' }}>
            BEEZ COMPUTER SERVICE
          </h1>
        </Col>

        {/* Contact Information */}
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center mb-3 mb-md-0">
          <div className="d-flex align-items-center mx-3">
            <FaPhoneAlt size={25} className="mx-2 text-dark" />
            <div>
              <p className="m-0" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                PHONE
              </p>
              <p className="m-0" style={{ fontSize: '1rem', fontWeight: '700' }}>
                071-5386140
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center mx-3">
            <FaClock size={25} className="mx-2 text-dark" />
            <div>
              <p className="m-0" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                OPEN HOURS
              </p>
              <p className="m-0" style={{ fontSize: '1rem', fontWeight: '700' }}>
                MON-SAT: 10AM TO 6PM
              </p>
            </div>
          </div>
        </Col>

        {/* Book Appointment Button  */}
        <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-center">
          <a href="/form">
            <Button
              className="shadow-sm px-4 py-2"
              style={{
                backgroundColor: hover ? '#0E8388' : '#254c4d', 
                border: 'none',
                color: '#fff',
                borderRadius: '50px',
                transform: hover ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease, background-color 0.3s ease', 
              }}
              
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              BOOK APPOINTMENT
            </Button>
          </a>
        </Col>
      </Row>
    </Container>
      {/*  Navbar  */}
      <Navbar currentPath="/"  />

      {/* Carousel Section */}
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img
              src="https://i.postimg.cc/Xv4s1ZLn/black-on-black-things-picjumbo-com.jpg"
              className="d-block w-100"
              alt="First Slide"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="overlay"></div>
            <div className="carousel-item-content carousel-caption d-none d-md-block"style={{ textAlign: 'left' }}>
              <h5 style={{ fontSize: '34px' }}>We Repair your Laptops</h5>
               
               <button
                   onClick={handleReadMoreClick}
                  style={{
                    border: '2px solid #000',  
                    padding: '10px 20px',      
                    backgroundColor:'#254c4d',
                    borderRadius: '5px',      
                    cursor: 'pointer',         
                  }}
                  >
                    {showMore ? 'SHOW LESS' : 'READ MORE'}
                  </button>

      
      {/* Conditionally render more content */}
      {showMore && (
        <div className="more-content" style={{ marginTop: '10px' }}>
          <p>We understand how important your laptop is for work, study, and staying connected. Our team of expert technicians specializes in diagnosing and fixing laptop issues efficiently, from hardware repairs to software troubleshooting. Whether it’s a cracked screen, battery issues, or performance slowdown, we’ve got you covered.</p>
        </div>
      )}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/yYhQmXhL/abstract-neon-visualization-of-a-large-city-with-skyscrapers-picjumbo.jpg"
              className="d-block w-100"
              alt="First Slide"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="overlay"></div>
            <div className="carousel-item-content carousel-caption d-none d-md-block"style={{ textAlign: 'left' }}>
              <h5 style={{ fontSize: '34px' }}>Computers</h5>
              <button
                   onClick={handleReadMoreClick}
                  style={{
                    border: '2px solid #000',  
                    padding: '10px 20px',      
                    backgroundColor:  '#254c4d',
                    borderRadius: '5px',      
                    cursor: 'pointer',         
                  }}
                  >
                    {showMore ? 'SHOW LESS' : 'READ MORE'}
                  </button>
      
      {/* Conditionally render more content */}
      {showMore && (
        <div className="more-content" style={{ marginTop: '10px' }}>
          <p>Is your computer running slower than usual, or are you experiencing hardware or software issues? Our skilled technicians offer a full range of repair and maintenance services for all types of computers, including desktops, laptops, and workstations. From virus removal and data recovery to hardware upgrades and system optimization, we ensure your device is performing at its best.</p>
        </div>
      )}
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://i.postimg.cc/qvkmjhj4/half-of-macbook-pro-2013-picjumbo-com.jpg"
              className="d-block w-100"
              alt="First Slide"
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <div className="overlay"></div>
            <div className="carousel-item-content carousel-caption d-none d-md-block"style={{ textAlign: 'left' }}>
              <h5 style={{ fontSize: '34px' }}>Machines</h5>
              <button
                   onClick={handleReadMoreClick}
                  style={{
                    border: '2px solid #000',  
                    padding: '10px 20px',      
                    backgroundColor:  '#254c4d', // Change background on hover
                    borderRadius: '5px',      
                    cursor: 'pointer',         
                  }}
                  >
                    {showMore ? 'SHOW LESS' : 'READ MORE'}
                  </button>
      
      {/* Conditionally render more content */}
      {showMore && (
        <div className="more-content" style={{ marginTop: '10px' }}>
          <p>Keep your machines running smoothly with our expert repair and maintenance services. Our experienced technicians handle a wide range of machines, including computers, printers, scanners, and other essential devices. Whether it’s routine maintenance, troubleshooting, or major repairs, we provide solutions that ensure optimal performance and longevity for all your equipment.</p>
        </div>
      )}
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Services Section */}
<motion.section
  className="container mx-auto p-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <section id="services" className="py-5">
    <Container className="text-center">
      <h2 className="text-3xl font-bold mb-4 underline">OUR SERVICES</h2>
      <Row>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-sm rounded">
            <div
              style={{
                overflow: 'hidden',
                
              }}
            >
              <Card.Img
                variant="top"
                src="https://i.postimg.cc/TP3BmXXM/IMG-3109-JPEG.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            <Card.Body className="bg-gray-800 text-white rounded-b-md">
              <Card.Title>LAPTOP REPAIR</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-sm rounded">
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <Card.Img
                variant="top"
                src="https://i.postimg.cc/y6TxXYs5/IMG-3112-JPEG.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            <Card.Body className="bg-gray-800 text-white rounded-b-md">
              <Card.Title>DESKTOP REPAIR</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-sm rounded">
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <Card.Img
                variant="top"
                src="https://i.postimg.cc/CMvYxZFF/IMG-3111-JPEG.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            <Card.Body className="bg-gray-800 text-white rounded-b-md">
              <Card.Title>SOFTWARE REPAIR</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <Card className="shadow-sm rounded">
            <div
              style={{
                overflow: 'hidden',
              }}
            >
              <Card.Img
                variant="top"
                src="https://i.postimg.cc/mDXqBH7J/IMG-3110-JPEG.jpg"
                style={{
                  transition: 'transform 0.3s ease',
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            <Card.Body className="bg-gray-800 text-white rounded-b-md">
              <Card.Title>ONLINE STORE</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </section>
</motion.section>

      <Footer/>
    </div>
  );
};

export default HomePage;
