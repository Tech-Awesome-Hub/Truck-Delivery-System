import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import LoginModal from '../components/loginModal';
import NotificationToast from "../components/notificationToast";
// import Header from '../components/header';
import ImagePicker from '../components/imgPicker';
import user from '../assets/user.png'; 
import { registerUser, getCsrfToken1 } from '../api/helper';

function Signup() {
  const [showModal, setShowModal] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    truck_type: "",
    axle_load: "",
    location: "",
    terms_conditions: false,
    is_active: true,
    customer_type: ''
  });
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(user);
  const fileInputRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const toggleToast = () => setShowToast(!showToast);
  const handleLoginClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [alert, setAlert] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const photoCheckUrl = 'http://localhost:3000/assets/user.1bce48a19eea1236de9fd9111b29b59f.png';

  const handleRoleSelect = (choice) => {
    setShowModal(false);
    if (choice === 'signup') navigate(`/signup`);
    else navigate(`/login?type=${choice}`);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = (formData, isChecked, imageSrc, photoCheckUrl, isCustomer) => {
    var status = 0;

    if (formData.password.length < 6) {
      setAlert("Password must be at least 6 characters long");
      status = 1;
      toggleToast();
    }
    if (!formData.email) {
      setAlert("Email is required");
      status = 1;
      toggleToast();
    }
    if (formData.phone.length < 10) {
      setAlert("Invalid phone number. Length must be 10");
      status = 1;
      toggleToast();
    }
    if (!formData.location) {
      setAlert("Location is required");
      status = 1;
      toggleToast();
    }
    if (!formData.customer_type & isCustomer) {
      setAlert("Please select customer type.");
      status = 1;
      toggleToast();
    }
    if (!isChecked) {
      setAlert("Please agree to the terms and conditions");
      setShowToast(true);
      status = 1;
      toggleToast();
    }

    // Check photo URL against restricted URL
    if (imageSrc === photoCheckUrl) {
      setAlert("The selected photo URL is not allowed. Please choose a different photo.");
      setShowToast(true);
      status = 1;
      toggleToast();
    }

    return status;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATE DATA
    if (validateForm(formData, isChecked, imageSrc, photoCheckUrl, (userType === 'customer')) === 1) return;

    // APPEND ADITIONAL PARAMETERS
    if (userType) {
        formData.user_type = userType;
    }
    if (isChecked) {
      formData.terms_conditions = isChecked;
    }
   
    // Prepare FormData
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Debugging: Log FormData before sending
    // for (let pair of data.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }
    // console.log("Form Data:", JSON.stringify(Object.fromEntries(data.entries())));

    // POST DATA
    const result = await registerUser(data);
 
    if (result) {
      if(result.success) {
        setAlert('Signup successful!');
        // Add License.
        navigate(`/login?type=${userType}`);
      }
      else {
        setAlert(`Error: ${result.error}`);
      }
    } 
 
    toggleToast();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        user_photo: fileInputRef.current.files[0], // Store the file
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  }

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  
  // Get crsf_token
  useEffect(() => {
    getCsrfToken1();
  }, []);
  

  return (
    <div className="App">
      <NotificationToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={alert}
      />
      <Container
        fluid
        className="h-custom d-flex align-items-center justify-content-center auth-container"
        style={{ minHeight: '100%' }}
      >
        <Row className="w-100 justify-content-center px-0 ">
          <Col lg={8} md={10} sm={12}  className='sign-container'>
            <Card className="shadow border-0 signup-card" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-5 pt-4 pb-3">
                <h5 className="fw-bold text-center mb-4" style={{ color: '#000' }}>
                  Sign Up for an Account
                </h5>
      
                {/* <p className="text-muted text-center mb-4">
                  Get moving with a reliable delivery service
                </p> */}
                {/* Google Buttons */}
                {/* <div className="text-center mb-4">
                  <Button
                    className="w-100 d-flex align-items-center justify-content-center bg-white border border-dark text-dark mb-3"
                    style={{ height: "45px" }}
                  >
                    <FcGoogle size={22} className="me-2" />
                    Continue with Google (Signup)
                  </Button>
                </div>
                <hr className="text-muted" /> */}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4 mt-4 text-center">
                    <div style={{width: '100%'}} className='flex align-items-center justify-content-center mb-4'>
                          <input type="file" accept="image/*" ref={fileInputRef} style={{ display:'none' }} onChange={handleImageChange} name="user_photo"/>
                          {imageSrc && <ImagePicker src={imageSrc} alt="Selected Image"  onClick={handleImageClick} />}
                    </div>
                    <Form.Select
                      size="lg"
                      className="rounded"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      required
                    >
                      <option value="">Select a user type</option>
                      <option value="driver">Driver</option>
                      <option value="customer">Customer</option>
                    </Form.Select>
                  </Form.Group>

                  <Row className="gy-4">
                    {userType === 'customer' && (
                      <>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="customer_name"
                              placeholder="Customer Name"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="location"
                              placeholder="Location"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Select
                              size="lg"
                              className="rounded"
                              name="customer_type"
                              onChange={handleInputChange}
                            >
                              <option value="">Select Customer Status</option>
                              <option value="company">Company</option>
                              <option value="individual">Individual</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </>
                    )}

                    {userType === 'driver' && (
                      <>
                        
                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="name"
                              placeholder="Driver Name"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="truck_type"
                              placeholder="Truck Type"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="text"
                              name="location"
                              placeholder="Location"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Control
                              size="lg"
                              type="number"
                              name="axle_load"
                              placeholder="Axle Load"
                              className="rounded"
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  </Row>

                  <Form.Group className="mt-3 mb-4 d-flex align-items-center">
                    <Form.Check type="checkbox" id="terms" name='terms_conditions' checked={isChecked} onChange={handleCheckboxChange} />
                    <label htmlFor="terms" className="ms-2 text-muted">
                      I agree to the <a href="/terms" className="text-dark">Terms and Conditions</a>
                    </label>
                  </Form.Group>

                  <Button variant="dark" size="lg" className="w-100 rounded" type='submit'>
                    Sign Up
                  </Button>
                </Form>

                <p className="mt-4 text-center text-muted">
                  Already have an account?{' '}
                  <Link onClick={handleLoginClick} className="text-dark fw-bold">
                    Login
                  </Link>
                </p>

                <LoginModal show={showModal} handleClose={handleClose} handleRoleSelect={handleRoleSelect} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
