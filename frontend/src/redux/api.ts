import axios from 'axios';


const api = axios.create({
  baseURL: 'https://mehedi-portfolio-vx4i.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api; 