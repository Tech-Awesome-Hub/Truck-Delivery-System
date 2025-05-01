import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TripModal = ({ show, handleClose, tripDetails, onComplete }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
  };

  const handleReject = () => {
    setIsAccepted(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Trip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Destination: {tripDetails.destination}</h5>
        <p>Customer: {tripDetails.customerName}</p>
        <p>Pickup Address: {tripDetails.pickupAddress}</p>
        
        <Form>
          <Form.Check
            type="checkbox"
            label="Accept Trip"
            checked={isAccepted}
            onChange={handleAccept}
            disabled={isAccepted}
          />
          <Form.Check
            type="checkbox"
            label="Reject Trip"
            checked={!isAccepted}
            onChange={handleReject}
            disabled={!isAccepted}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={handleClose} 
          className="w-100" 
          style={{ borderRadius: '10px' }}
        >
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={onComplete} 
          className="active-trip w-100" 
          disabled={!isAccepted}
        >
          Complete Trip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TripModal;
