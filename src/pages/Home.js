import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import Header from '../components/header';
import LoginModal from '../components/loginModal';
import truck from '../assets/tk1.mp4';
import deliveryTruck from '../assets/delivery-truck.png';
import fastDelivery from '../assets/fast-delivery.png';
import customerSupport from '../assets/help-desk.png'; 
import { checkUserStatus, getCsrfToken1, useGetAuthToken2, useGetUserType } from '../api/helper';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [axleLoad, setAxleLoad] = useState('');
  const [date, setDate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = useGetAuthToken2(useSelector);
  const userType = useState(useGetUserType(useSelector));
  const dispatch = useDispatch();
  
  useEffect(() => {
    checkUserStatus(token, function(r){
      setIsLoggedIn(r);
      console.log(r);
      if(!r) {
        getCsrfToken1(dispatch);
      }
    });
    window.scrollTo(0, 0);
    console.log(userType)
  },[]);

  // getCsrfToken1(dispatch);
  // const csrfToken = useSelector((state) => state.auth.csrfToken);
  // alert(csrfToken)

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRoleSelect = (choice) => {
    setShowModal(false);
    if (choice === 'signup') navigate(`/signup`);
    else {
      navigate(`/login?type=${choice}`);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate(`/available-trucks?axleLoad=${axleLoad}&date=${date}`);
  };

  return (
    <section className="App">
      <Header isUserVerified={isLoggedIn} userType={userType} />
      <section className='body-content'>
        {/* Hero Section */}
        <section className="hero position-relative text-white text-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="position-absolute w-100 h-100 video-bg"
          >
            <source src={truck} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="container d-flex justify-content-center align-items-center hero-overlay">
            <div>
              <h1 className="display-4 fw-bold">Reliable Truck Delivery Services</h1>
              <p className="lead">Fast, Safe, and Affordable Delivery Solutions for Your Business</p>
              {(isLoggedIn) ? "" : <Button variant="dark" size="lg" onClick={handleLoginClick}> Login / Sign Up</Button>}
            </div>
          </div>
        </section>

        {/* Find Available Truck Section */}
        <section className="find-truck py-5 bg-light position-relative">
          <Container>
            <h3 className="text-center display-5 mb-4">Find an Available Truck</h3>
            <Row className="justify-content-center">
              <Col md={8}>
                <form onSubmit={handleSearchClick} className="find-truck-form d-flex gap-3 align-items-center p-3 shadow rounded">
                  <input
                    type="text"
                    placeholder="Enter truck axle load"
                    className="form-control find-truck-input"
                    value={axleLoad}
                    onChange={(e) => setAxleLoad(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control find-truck-date"
                    required
                  />
                  <Button variant="dark" type="submit" className="find-truck-btn" >
                    Search
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        </section>

        {/* About Section */}
        <section className="about py-5 bg-light text-center">
          <Container>
            <h2 className="display-5">Why Choose Us?</h2>
            <p className="lead">
              We offer reliable and efficient delivery services tailored to your needs.
            </p>
            <Row className="mt-4">
              <Col md={4} className="about-box">
                <div className='shadow' style={{ padding: '10px', marginBottom: '10px'}}>
                  <img src={deliveryTruck} alt="Reliable Delivery" className="img-fluid rounded" />
                </div>
                <h4>Reliable</h4>
                <p>Our network of experienced drivers ensures timely shipments.</p>
                <Button className="learn-more-btn">Learn More</Button>
              </Col>
              <Col md={4} className="about-box">
                <div className='shadow' style={{ padding: '10px', marginBottom: '10px'}}>
                  <img src={fastDelivery} alt="Affordable Pricing" className="img-fluid rounded" />
                </div>
                <h4>Fast Delivery</h4>
                <p>Get your goods delivered quickly and safely every time.</p>
                <Button className="learn-more-btn">Learn More</Button>
              </Col>
              <Col md={4} className="about-box">
                <div className='shadow' style={{ padding: '10px', marginBottom: '10px'}}>
                  <img src={customerSupport} alt="Customer Support" className="img-fluid rounded" />
                </div>
                <h4>24/7 Support</h4>
                <p>Our support team is always here to help you.</p>
                <Button className="learn-more-btn">Learn More</Button>
              </Col>
            </Row>
          </Container>
        </section>
        
        {/* Call to Action Section */}
        <section className="cta py-5 text-center gradient-bg">
          <Container>
            <h3 className="display-4 text-white">Ready to Get Started?</h3>
            <p className="lead text-white">Join us today and experience seamless delivery management.</p>
            {(isLoggedIn) ? "" : <Button variant="dark" size="lg" onClick={handleLoginClick}> Start Now</Button> }
          </Container>
        </section>

        {/* Footer */}
        <footer className="footer py-3 bg-dark text-white text-center">
          <Container>
            <p className="mb-0">© 2025 Truck Delivery Inc. | All rights reserved</p>
            <p className="mb-0">
              <a href="mailto:contact@truckdelivery.com" className="text-white">
                contact@truckdelivery.com
              </a>
            </p>
          </Container>
        </footer>
        </section>
      <LoginModal show={showModal} handleClose={handleClose} handleRoleSelect={handleRoleSelect} />
    </section>
  );
};

export default Home;
