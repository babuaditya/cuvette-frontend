import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cuvette-backend-wvsf.onrender.com', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
