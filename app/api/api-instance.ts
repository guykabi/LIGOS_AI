import axios from "axios"; 

const Axios = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === 'production' ? 
      process.env.NEXT_PUBLIC_URL_PROD:
      process.env.NEXT_PUBLIC_URL
});

export default Axios;