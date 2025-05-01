import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap'; // import components from react-bootstrap

const LoginModal = ({ show, handleClose, handleRoleSelect }) => {
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Your Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h6 className="mb-4">Please choose your login type</h6>
          <Row className="row d-flex justify-content-center align-items-center">
            <Col xs={12} md={4} className="mb-3">
              <Card onClick={() => handleRoleSelect('driver')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>Driver</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="mb-3">
              <Card onClick={() => handleRoleSelect('customer')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>Customer</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12} md={4} className="mb-3">
              <Card onClick={() => handleRoleSelect('signup')} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <Card.Title>Sign Up</Card.Title>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ marginRight: '160px' }}>
              Don't have an account? <Link to="/signup" style={{ textDecoration: 'underline', color: '#000' }}>Sign up</Link>
        </div>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
