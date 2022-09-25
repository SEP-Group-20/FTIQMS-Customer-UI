import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/vehicle";

const isVehicleRegistered = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkVehicleRegistered",
        data: formData,
    });
};

const isVehicleReal = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/checkVehicleExistence",
        data: formData,
    });
};

const getVehicleDetails = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getVehicleDetails",
        data: formData,
    });
};

const registerVehicle = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/register",
        data: formData,
    });
};

export {isVehicleRegistered, isVehicleReal, getVehicleDetails, registerVehicle};