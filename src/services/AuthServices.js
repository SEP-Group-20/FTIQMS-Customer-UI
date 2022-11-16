import axios from './HttpsServices';

const APIEndPoint = "/api/auth";

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
        withoutToken: true,
        data: formData,
    });
};
const loginCustomer = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/customerLogin",
        withoutToken: true,
        data: formData,
    });
};
const getMobileByNIC = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getMobileByNIC",
        data: formData,
    });
};
const validateFirebaseToken = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/validateFirebaseAndLogin",
        data: formData,
    });
};
const logoutBackend = () => {
    return axios({
        method: "get",
        url: APIEndPoint + "/logout"
    });
};

export { checkNICExistance, registerCustomer, loginCustomer, getMobileByNIC, validateFirebaseToken, logoutBackend };