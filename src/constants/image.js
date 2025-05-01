import React from 'react';
import { FaChartLine, FaEllipsisH, FaEllipsisV, FaBars, FaMapMarkerAlt, FaCog, FaUser, FaHistory, FaSignOutAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const AllImages = {
    User: () => <FaUser />,
    History: () => <FaHistory />,
    Map: () => <FaMapMarkerAlt />,
    Cog: () => <FaCog />,
    Logout: () => <FaSignOutAlt />,
    Bars: () => <FaBars />,
    ArrowRight: () => <FaChevronRight />,
    ArrowDown: () => <FaChevronDown />,
    EllipsisV: () => <FaEllipsisV />,
    EllipsisH: () => <FaEllipsisH />,
    Dashboard: () => <FaChartLine />,
    // Dashboard: () => <FaDashboard />,
  };
  
  export default AllImages;