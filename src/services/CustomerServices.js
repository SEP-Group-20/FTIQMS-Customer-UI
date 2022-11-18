import axios from './HttpsServices';

const APIEndPoint = "/api/customer";

const getCustomerDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getCustomerDetails",
        data: formData,
    });
}

const getAllRegisteredVehicleDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getAllRegisteredVehicleDetails",
        data: formData,
    });
};

const getRemainingFuel = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getFuelStatus",
        data: formData,
    });
};

const resetPassword = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/resetPassword",
        data: formData,
    });
};

const getDashboardDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getDashboardDetails",
        data: formData,
    });
};

export {
    getCustomerDetails,
    getAllRegisteredVehicleDetails,
    getRemainingFuel,
    resetPassword,
    getDashboardDetails
};