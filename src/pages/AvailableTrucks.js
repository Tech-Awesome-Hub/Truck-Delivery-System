import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/header';

const AvailableTrucks = () => {
  const location = useLocation();
  const [trucks, setTrucks] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const axleLoad = queryParams.get('axleLoad');
  const date = queryParams.get('date');

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get(
          `http://localhost/dtms/api/available_trucks?axleLoad=${axleLoad}&date=${date}`
        );
        setTrucks(response.data);
      } catch (error) {
        console.error('Error fetching trucks:', error);
      }
    };
    if (axleLoad && date) fetchTrucks();
  }, [axleLoad, date]);

  return (
    <div>
      <Header />
      <Container className="py-5">
        <h2 className="text-center">Available Trucks</h2>
        <Row className="mt-4">
          {trucks.length > 0 ? (
            trucks.map((truck, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>Truck ID: {truck.id}</Card.Title>
                    <Card.Text>
                      Axle Load: {truck.axleLoad}
                      <br />
                      Availability Date: {truck.date}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No trucks available for the given parameters.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AvailableTrucks;
