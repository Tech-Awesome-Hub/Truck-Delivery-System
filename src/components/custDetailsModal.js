import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomerDetailsModal = ({ show, handleClose, customerDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Name: {customerDetails.name}</h5>
        <p>Email: {customerDetails.email}</p>
        <p>Phone: {customerDetails.phone}</p>
        <p>Address: {customerDetails.address}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;
