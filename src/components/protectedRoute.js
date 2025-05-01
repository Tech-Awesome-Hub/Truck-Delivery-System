
import React, {useState, useEffect} from 'react'
import { Navigate  } from 'react-router-dom';
import { useGetAuthToken2 } from '../api/helper';
import { useSelector } from "react-redux";

// Fetch protected data example
const ProtectedRoute = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [loading, setLoading] = useState(true);
    const token = useGetAuthToken2(useSelector);

    useEffect(() => {
      if(token){
        setTimeout(function(){
          setIsLoggedIn(true);;
          setLoading(false);
        }, 3000);
      }
    },[token]);

    if(loading) return <div className='loader'> <span>loading...</span></div>;
    return isLoggedIn ? children : <Navigate to='/' />
  };

export default ProtectedRoute;