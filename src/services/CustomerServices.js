import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/customer";

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

export {getCustomerDetails, getAllRegisteredVehicleDetails, getRemainingFuel};