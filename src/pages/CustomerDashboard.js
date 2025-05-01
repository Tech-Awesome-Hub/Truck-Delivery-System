import React, { useState, useEffect } from 'react';
import { Container, Row, Nav, Col, Card, Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import { FaPlus, FaMapMarkerAlt, FaChartBar, FaTruck, FaBell, FaFileInvoiceDollar, FaChevronRight, FaHistory } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from "react-redux";

import AllImages from "../constants/image";
import Header from '../components/header';
import { useGetAuthToken2, useGetCsrfToken2, useGetUserType } from '../api/helper';

const CompanyDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = useGetAuthToken2(useSelector);
  const csrf_token = useGetCsrfToken2(useSelector);
  const userType = useState(useGetUserType(useSelector));

  useEffect(() => {
    // fetchDeliveries();
    // fetchAnalyticsData();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost/xampp-backend/fetch_deliveries.php');
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching delivery data', error);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get('http://localhost/xampp-backend/fetch_analytics.php');
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data', error);
    }
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleBookDelivery = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post('http://localhost/xampp-backend/book_delivery.php', formData);
      setShowBookingModal(false);
      setShowAlert(true);
      fetchDeliveries();
    } catch (error) {
      console.error('Error booking delivery', error);
    }
  };

  const [activeSection, setActiveSection] = useState('bookDelivery');

  const handleSidebarClick = (section) => {
    if (section !== activeSection) {
      setActiveSection(section);
    }
  };

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
            <FaChevronRight className={`toggle-arrow ${isCollapsed ? 'rotated' : ''}`} onClick={toggleSidebar} />
              {/* {!isCollapsed && <span className="text-center" style={{ fontSize: '18px', fontWeight: 'bold'}}>Driver Dashboard</span>} */}
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link variant="outline-light" onClick={() => setShowBookingModal(true)} className="sidebar-link">
                    <FaPlus /> {!isCollapsed && <span>Book Delivery</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('tracking')} className="sidebar-link">
                    <FaMapMarkerAlt /> {!isCollapsed && <span>Tracking</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('analytics')} className="sidebar-link">
                    <FaChartBar /> {!isCollapsed && <span>Analytics</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('notifications')} className="sidebar-link">
                    <FaBell /> {!isCollapsed && <span>Notifications</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('billing')} className="sidebar-link">
                    <FaFileInvoiceDollar /> {!isCollapsed && <span>Billing & Invoices</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('trucks')} className="sidebar-link">
                    <FaTruck /> {!isCollapsed && <span>Trucks</span>}
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link onClick={() => handleSidebarClick('tripHistory')} className="sidebar-link">
                    <FaHistory /> {!isCollapsed && <span>Trip History</span>}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Card.Body>
          </Card>
        </Col>

        {activeSection === 'bookDelivery' && (
        <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaTruck /> Book Delivery</h4>
                <div className="section-card-body">
                <p>Book a new delivery and track it in real-time.</p>
                <Button variant="primary" onClick={() => alert('Book Delivery')}>
                    Book Now
                </Button>
                </div>
            </div>
        </Col>
        )}

        {/* Tracking Section */}
        {activeSection === 'tracking' && (
            <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaMapMarkerAlt /> Tracking</h4>
                <div className="section-card-body">
                <p>Track the status of your deliveries and monitor their progress.</p>
                <Button variant="primary" onClick={() => alert('Track Delivery')}>
                    Track Now
                </Button>
                </div>
            </div>
            </Col>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
            <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaChartBar /> Analytics</h4>
                <div className="section-card-body">
                <p>View your delivery performance, total revenue, and more.</p>
                <Button variant="primary" onClick={() => alert('View Analytics')}>
                    View Analytics
                </Button>
                </div>
            </div>
            </Col>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
            <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaBell /> Notifications</h4>
                <div className="section-card-body">
                <p>Get notified about delivery status, delays, and updates.</p>
                <Button variant="primary" onClick={() => alert('Check Notifications')}>
                    View Notifications
                </Button>
                </div>
            </div>
            </Col>
        )}

        {/* Billing & Invoices Section */}
        {activeSection === 'billing' && (
            <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaFileInvoiceDollar /> Billing & Invoices</h4>
                <div className="section-card-body">
                <p>Manage your invoices and track your payments.</p>
                <Button variant="primary" onClick={() => alert('View Billing')}>
                    View Invoices
                </Button>
                </div>
            </div>
            </Col>
        )}

        {/* Trucks Section */}
        {activeSection === 'trucks' && (
            <Col md={9} className="main-content p-4">
            <div className="section-card">
                <h4><FaTruck /> Trucks</h4>
                <div className="section-card-body">
                <p>Manage and monitor your fleet of trucks.</p>
                <Button variant="primary" onClick={() => alert('Manage Trucks')}>
                    Manage Fleet
                </Button>
                </div>
            </div>
            </Col>
        )}

        {/* Trip History Section */}
        {activeSection === 'tripHistory' && (
        <Col md={9} className="main-content p-4">
          <h1>Delivery History</h1>
          {showAlert && <Alert variant="success">New delivery booked successfully!</Alert>}
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pickup Location</th>
                <th>Drop-off Location</th>
                <th>Status</th>
                <th>Driver</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr key={index}>
                  <td>{delivery.id}</td>
                  <td>{delivery.pickup}</td>
                  <td>{delivery.dropoff}</td>
                  <td>{delivery.status}</td>
                  <td>{delivery.driver_name}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h2 className="mt-5">Analytics</h2>
          {analyticsData && (
            <div className="analytics">
              <p>Total Deliveries: {analyticsData.totalDeliveries}</p>
              <p>Total Revenue: ${analyticsData.totalRevenue}</p>
              <p>Completed Deliveries: {analyticsData.completed}</p>
            </div>
          )}
        </Col>
       )}
      </Row>

      {/* Booking Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book a New Delivery</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBookDelivery}>
          <Modal.Body>
            <Form.Group controlId="pickup">
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control type="text" name="pickup" required />
            </Form.Group>
            <Form.Group controlId="dropoff">
              <Form.Label>Drop-off Location</Form.Label>
              <Form.Control type="text" name="dropoff" required />
            </Form.Group>
            <Form.Group controlId="packageDetails">
              <Form.Label>Package Details</Form.Label>
              <Form.Control as="textarea" rows={3} name="packageDetails" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
    </section>
    </div>
  );
};

export default CompanyDashboard;
