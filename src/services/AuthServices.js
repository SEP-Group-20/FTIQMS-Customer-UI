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
const loginCustomer = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/customerLogin",
        data: formData,
    });
};

export {checkNICExistance,registerCustomer,loginCustomer};