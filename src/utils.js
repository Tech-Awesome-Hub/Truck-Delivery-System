
// const utils = () => {
//   const users = () => {
//     this.setUser = function (userType) {
//       sessionStorage.setItem('user', JSON.stringify(userType));
//     }

//     this.getUser = function () {
//       return sessionStorage.getItem('user');
//     }
//   };

//   return (users);
// };

// export default utils();

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-backend-url.com/api',  // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') // Add token if authentication is required
  }
});

export default axiosInstance;
