import React, { useState } from 'react'; 
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { useAuth } from '../api/helper';
import ImagePicker from '../components/imgPicker';
import user from '../assets/user.png'; 
import { useGetCsrfToken2 } from '../api/helper';

const Login = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get('type');
  const [formData, setFormData] = useState({email: "",password: "", remember_me: false});
  const login = useAuth(useDispatch());
  const [shoudRemember, setShouldRemember] = useState(false);
  const token = useGetCsrfToken2(useSelector);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (shoudRemember) {
        formData.remember_me = shoudRemember;
    }
    if ( userType ) {
      formData.user_type = userType;
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
     console.log("Form Data:", JSON.stringify(Object.fromEntries(data.entries()))); 
    console.log(token)

     await login.loginUser(data, token, function(role){
          setTimeout(() => {
            if (role === 'driver') {
              navigate('/driver-dashboard');
            } else if (role === 'customer') {
              navigate('/customer-dashboard');
            }
          }, 5000); 
      });

    // toggleToast();
  };

  return (
    <div className='App'>
        {/* <Header />  Use Header component */}
      
        {/* Page content */}
        <Container fluid style={{ minHeight: '100%' }} className="d-flex justify-content-center align-items-center auth-container">
        <Card style={{ width: '100%', maxWidth: '450px', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} className="text-center auth-card">
            
            <h5 className=" mb-4" style={{ fontSize: '16px' }}>
                {userType === 'driver' && ("Login as Driver") }
                {userType === 'customer' && ("Login As Customer") }
            </h5>

            {/* Google Buttons */}
            {/* <div className="text-center mb-2">
              <Button
                className="w-100 d-flex align-items-center justify-content-center bg-white border border-dark text-dark"
                style={{ height: "45px" }}
              >
                <FcGoogle size={22} className="me-2" />
                Continue with Google (Login)
              </Button>
            </div>
            <hr className="text-muted" /> */}
            {/* <span className='mb-4 fw-bold'>OR</span> */}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
                    <div style={{width: '100%'}} className='flex align-items-center justify-content-center mb-4'>
                          {<ImagePicker src={user} alt="Auth Image" />}
                    </div>
                    <Form.Control 
                        size="lg" 
                        type="email" 
                        name="email"
                        placeholder="Enter email" 
                        className="rounded-pill"
                        onChange={handleInputChange} 
                        required 
                
                    />
            </Form.Group>
            
            <Form.Group className="mb-4">
                    <Form.Control 
                    size="lg" 
                    type="password" 
                    name="password"
                        placeholder="Enter password" 
                        className="rounded-pill"
                        onChange={handleInputChange}
                        required 
                    />
            </Form.Group>

            <Button 
                variant="primary" 
                type="submit" 
                className="w-100" 
                style={{
                borderRadius: '30px', 
                backgroundColor: '#1e1e1e', 
                padding: '15px',
                fontWeight: 'bold',
                fontSize: '16px',
                }}
            >
                Login
            </Button>
            </Form>

            <div className="mt-3">
              Don't have an account? <Link to="/signup" style={{ textDecoration: 'underline', color: '#000' }}>Sign up</Link>
            </div>
        </Card>
        </Container>
    </div>
  );
};

export default Login;
