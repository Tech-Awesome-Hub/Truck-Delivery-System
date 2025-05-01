import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Button, ListGroup } from 'react-bootstrap';
import { useSelector } from "react-redux";

import AllImages from "../constants/image";
import Header from '../components/header';
import TripModal from '../components/tripModal'; // Import the TripModal component
import CustomerDetailsModal from '../components/custDetailsModal';
import { useGetAuthToken2, useGetCsrfToken2, useGetUserType, fetchActiveTrip, fetchTripHistory } from '../api/helper';

const DriverDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showTripModal, setShowTripModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [activeTrip, setActiveTrip] = useState([]);
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [tripDetails, setTripDetails] = useState({
    destination: "123 Main Street",
    customerName: "John Doe",
    pickupAddress: "456 Elm Street"
  });
  const [tripHistoryDetails, setTripHistoryDetails] = useState({
    destination: "123 Main Street",
    customerName: "John Doe",
    pickupAddress: "456 Elm Street"
  });
  const [customerDetails] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main Street"
  });

  const handleTripComplete = () => {
    setShowTripModal(false);
    alert("Trip Completed!");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useGetAuthToken2(useSelector);
  const csrf_token = useGetCsrfToken2(useSelector);
  const userType = useState(useGetUserType(useSelector));

  // console.log(csrf_token)
  // console.log(token)

  useEffect(() => {
    fetchActiveTrip(csrf_token, setActiveTrip, activeTrip, setLoading);
    fetchTripHistory(csrf_token, setTripHistory, tripHistory, setLoading);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); 
  // tripDetails, tripHistoryDetails, token, csrf_token

  return (
    <div className='App'>
    <Header isUserVerified={isLoggedIn}  /> 
    <section className='body-content'>
    <Container fluid className="dashboard-container">
      <Row>
        {/* Sidebar */}
        <Col sm={isCollapsed ? 1 : 3} className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <Card className="shadow card-menu">
            <Card.Body>
            <AllImages.ArrowRight className={`toggle-arrow ${isCollapsed ? 'rotated' : ''}`} onClick={toggleSidebar} />
              {/* {!isCollapsed && <span className="text-center" style={{ fontSize: '18px', fontWeight: 'bold'}}>Driver Dashboard</span>} */}
              <Nav className="flex-column">
              <Nav.Item>
                  <Nav.Link href="#profile" className="sidebar-link">
                    <AllImages.User /> {!isCollapsed && <span>Dashboard</span>}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#map" className="sidebar-link">
                    <AllImages.Map /> {!isCollapsed && <span>Map View</span>}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#history" className="sidebar-link">
                    <AllImages.History /> {!isCollapsed && <span>Trip History</span>}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col sm={isCollapsed ? 11 : 9} className="main-content">
          <Row>
            <Col lg={8} className='db-cols'>
              <div className="map-card mb-4">
                <Card.Body>
                  <Card className="trip-card mb-4 shadow">
                        <Card.Body className='d-flex align-items-center justify-content-center'>
                          <h4>Welcome back!</h4>
                        </Card.Body>
                  </Card>
                  <Card className="trip-card mb-4 shadow">
                    <Card.Body>
                      <h4>Current Location</h4>
                      <div className="map-container">
                        <div className="map-placeholder">Map Placeholder</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </div>
            </Col>

            <Col lg={4} style={{ paddingTop: '15px'}} className='db-cols'>
              {/* Active Trip Info */}
              {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    {activeTrip ? (
                      <Card className="trip-card mb-4 shadow">
                        <Card.Body>
                          <h4>Active Trip</h4>
                          <p>Destination: <strong>{activeTrip.destination}</strong></p>
                          <p>Customer: <strong>{activeTrip.customerName}</strong></p>
                          <Button variant="dark" className="w-100 btn">
                            Complete Trip
                          </Button>
                        </Card.Body>
                      </Card>
                    ) : (
                      <Card className="trip-card mb-4 shadow">
                        <Card.Body>
                          <h4>No Active Trip</h4>
                          <p>Waiting for a new trip request...</p>
                        </Card.Body>
                      </Card>
                    )}

                    {/* Recent Activity */}
                    <Card className="activity-card mb-4">
                      <Card.Body>
                        <h4>Recent Activity</h4>
                        <ListGroup variant="flush">
                          {tripHistory.length > 0 ? (
                            tripHistory.map((trip, index) => (
                              <ListGroup.Item key={index}>
                                Completed Trip: {trip.date} - {trip.distance} miles - ${trip.amount}
                              </ListGroup.Item>
                            ))
                          ) : (
                            <ListGroup.Item>No trip history available.</ListGroup.Item>
                          )}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </>
                )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    {/* Trip Modal */}
    <TripModal 
        show={showTripModal} 
        handleClose={() => setShowTripModal(false)} 
        tripDetails={tripDetails} 
        onComplete={handleTripComplete} 
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        show={showCustomerModal} 
        handleClose={() => setShowCustomerModal(false)} 
        customerDetails={customerDetails} 
      />
    </section>
    </div>
  );
};

export default DriverDashboard;
