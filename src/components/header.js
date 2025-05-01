import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Offcanvas, Button, Dropdown } from 'react-bootstrap';
import AllImages from "../constants/image";
import { useLogout } from "../api/redux/logout";
import { logout } from '../api/helper';
import { useNavigate } from 'react-router-dom';

const Header = ({isUserVerified, userType}) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const Logout = useLogout();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  // Toggle the offcanvas (side navigation)
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOnMenuClick = async (e) => {
    e.preventDefault();

    if(!e.target.text) return;

    if(e.target.text.replaceAll(' ', '') === 'Dashboard') {
      console.log(e.target.text)
    } else if(e.target.text.replaceAll(' ', '') === 'Settings') {

    } else if(e.target.text.replaceAll(' ', '') === 'Logout') {
      Logout.handleLogout();
      await logout();
      await navigate('/');
      // window.location.reload();
    }
   
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-full bg-dark shadow p-2 sticky top-0 z-10 header">
      <div className='header-content-container'>
        <Navbar.Brand href="/">Zippy</Navbar.Brand>

        {/* Main Navbar links (hidden on mobile) */}
        <Navbar.Collapse id="navbar-nav" className="d-none d-lg-block">
          <Nav className="ml-auto" style={{ color: 'white !important'}}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* User Profile Button */}
        <div className="d-flex align-items-center space-x-4">
          {(isUserVerified === true) ?
            <Dropdown show={isDropdownOpen} onToggle={toggleDropdown} autoClose="outside">
              <Dropdown.Toggle 
                variant="link" 
                className="user-btn text-white d-flex align-items-center rounded-pill py-2 px-3 border-0" 
                onClick={toggleDropdown}
              >
                <span className="font-medium">
                  <AllImages.User />
                </span>
                <span className="d-none d-md-inline font-medium ms-2"></span>
                <AllImages.ArrowDown className="ms-2" />
              </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} onClick={handleOnMenuClick}><AllImages.Cog /> Dashboard</Dropdown.Item>
              <Dropdown.Item as={Link} onClick={handleOnMenuClick}><AllImages.Cog /> Settings</Dropdown.Item>
              <Dropdown.Item as={Link} onClick={handleOnMenuClick}><AllImages.Logout /> Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> : ""}

          {/* Button to toggle side nav on mobile */}
          <Button className="d-lg-none" variant="outline-light" onClick={handleShow}>
          <AllImages.Bars />
          </Button>
        </div>
        
      </div>

      {/* Side Navigation for Mobile (Offcanvas) */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={handleClose}>Services</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleClose}>Contact</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default Header;

