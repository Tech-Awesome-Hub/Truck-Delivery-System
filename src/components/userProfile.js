import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import AllImages from "../constants/image";
import { FaCog, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const UserProfile = ({isUserVerified}) => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    const [show, setShow] = useState(false);

    // Toggle the offcanvas (side navigation)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <Dropdown show={isDropdownOpen} onToggle={toggleDropdown} autoClose="outside">
              <Dropdown.Toggle 
                variant="link" 
                className="user-btn text-white d-flex align-items-center rounded-pill py-2 px-3 border-0" 
                onClick={toggleDropdown}
              >
                <span className="font-medium">
                  <AllImages.user />
                </span>
                <span className="d-none d-md-inline font-medium ms-2"></span>
                <FaChevronDown className="ms-2" />
              </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile"><FaSignOutAlt /> Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings"><FaCog /> Settings</Dropdown.Item>
              <Dropdown.Item as={Link} to="/logout"><FaSignOutAlt /> Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    )
}