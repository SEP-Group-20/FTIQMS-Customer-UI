import Axios from 'axios';

const axiosInstance = Axios.create({
    // withCredentials: true,
    baseURL: "http://localhost:3001",
});

export default axiosInstance;