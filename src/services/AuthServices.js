import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/auth";

const checkNICExistance = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkNIC",
        data: formData,
    });
};

const registerCustomer = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/register",
        data: formData,
    });
};

export {checkNICExistance,registerCustomer};