import axios from 'axios';
import { setAuthToken, setCsrfToken, setUserType } from "../api/redux/authSlice";

const API_BASE_URL = 'http://localhost/dtms/api';

export const getCsrfToken1 = async (dispatch) => {
  try {
      const response = await axios.get("http://localhost/dtms/api/csrf_token.php", { withCredentials: true });
      dispatch(setCsrfToken(response.data.csrf_token)); 
  } catch (error) {
      console.error("Failed to fetch CSRF token", error);
  }
};

export const useGetCsrfToken2 = (useSelector) => { 
  try {
     return useSelector((state) => state.auth.csrfToken);
    //  || document.cookie
    //  .split("; ")
    //  .find(row => row.startsWith("csrf_token="))
    //  ?.split("=")[1];
  } catch(e) {
    console.error(e);
  }
};

export const useGetUserType = (useSelector) => {
  try {
     return useSelector((state) => state.auth.userType);
  } catch(e) {
    console.error(e);
  }
};

export const getAuthToken1 = async (dispatch) => {
  try {
      const response = await axios.get("http://localhost/dtms/api/auth_token.php", { withCredentials: true });
      dispatch(setAuthToken(response.data.auth_token)); 
  } catch (error) {
      console.error("Failed to fetch AUTH token", error);
  }
};

export const useGetAuthToken2 = (useSelector) => {
  try {
     return useSelector((state) => state.auth.authToken);
  } catch(e) {
    console.error(e);
  }
};

const checkSession = async () => {
  try {
    const res = await axios.post(`${API_BASE_URL}/check_session.php`, {},{
        withCredentials: true,
      }
    ); 
    return res.data.loggedIn;
  } catch(e) {
      console.error(e);
  }
};

export const checkUserStatus = async (token, func) => {
      try {
        const ss = await checkSession();
        if (ss === true) {
          const result = await verifyUser(token);
          if(func) func(result.success);
        } else {
          console.log('User is logged out');
          if(func) func(false);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
};

const deleteAllCookies = async (name) => {
  document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
};

const clearTokens = async () => {
  try {
      await axios.get("http://localhost/dtms/api/logout.php", { withCredentials: true });
 
      const cookies = document.cookie.split(';');
      for (var i=0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf('=');
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        deleteAllCookies(name);
      }
  } catch (error) {
      console.error("Failed to logout:", error);
  }
};

export const registerUser = async (data, csrfToken) => {
  try { 
    const response = await axios.post(`${API_BASE_URL}/signup.php`, data, {
      headers: { "Content-Type": "multipart/form-data"},
      withCredentials: true,
    });
    // console.log("Server Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Unexpected error during login: ${error}`);
    return { success: false, error: `Unexpected error during login: ${error}`};
  }
};

// Login function to request token
export const useAuth = (dispatch) => {

  const loginUser = async (data, token, func) => {
    try {
      
      const response = await axios.post(
        `${API_BASE_URL}/_login.php`, 
        data, // Directly pass data as the second argument
        {
          headers: {
            "X-CSRF-Token": token, // Send CSRF token
            "Content-Type": "application/json", // Ensure JSON format
          },
          withCredentials: true, // Allow cookies (if needed)
        }
      );      
      
      console.log("Server Response:", response.data);
      if (response.data.success) {
        dispatch(setAuthToken(response.data.token)); // Save Auth Token
        dispatch(setUserType(response.data.role)); // Save Auth Token
        if(func) func(response.data.role);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return { loginUser };
}

const verifyUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify.php`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // console.error('User verification failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  await clearTokens();
  console.log('user logged out');
};

// Fetch protected data example
export const fetchProtectedData = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    console.error('No token found');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/protected-endpoint.php`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch Active Trip Data
export const fetchActiveTrip = async (token, setActiveTrip, data, setLoading) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/trip_history.php`, 
      {'user_id': 1}, 
      {
        headers: {
          "X-CSRF-Token": token, // Send CSRF token
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Allow cookies (if needed)
      }
    ); 

    setActiveTrip(response.data || data); // Set the active trip data
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false); // Set loading to false after fetching
  }
};

// Fetch Trip History Data
export const fetchTripHistory = async (token, setTripHistory, data, setLoading) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/trip_history.php`, 
      {'user_id': 1}, 
      {
        headers: {
          "X-CSRF-Token": token, // Send CSRF token
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Allow cookies (if needed)
      }
    ); 

  // Log response to check structure
  console.log("API Response:", response.data);

  if (response.data.success) {
    setTripHistory(response.data);
  } else {
    setTripHistory(data);
  }

  } catch (err) {
    console.error("Error fetching trip history:", err);
    setTripHistory(data);
  } finally {
    setLoading(false); // Set loading to false after fetching
  }
};
