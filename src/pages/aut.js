import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-indigo-200">
      <Container fluid="lg">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg p-4 rounded-3">
              <Card.Body>
                <h2 className="text-center fw-bold text-primary mb-4">
                  Welcome to DTMS!
                </h2>
                <p className="text-center text-muted">
                  Sign up or login to continue.
                </p>

                {/* Google Buttons */}
                <div className="text-center mb-4">
                  <Button
                    className="w-100 d-flex align-items-center justify-content-center bg-white border border-dark text-dark mb-3"
                    style={{ height: "45px" }}
                  >
                    <FcGoogle size={22} className="me-2" />
                    Continue with Google (Signup)
                  </Button>

                  <Button
                    className="w-100 d-flex align-items-center justify-content-center bg-white border border-dark text-dark"
                    style={{ height: "45px" }}
                  >
                    <FcGoogle size={22} className="me-2" />
                    Continue with Google (Login)
                  </Button>
                </div>

                <hr className="text-muted" />

                {/* Traditional Form */}
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Check type="checkbox" label="Remember me" />
                    <a href="/" className="text-primary">
                      Forgot Password?
                    </a>
                  </div>

                  <Button variant="primary" className="w-100 mt-3">
                    Login
                  </Button>
                </Form>

                <p className="text-center mt-4">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-primary">
                    Sign up here
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuthPage;
