import axios from './HttpsServices';

const APIEndPoint = "/api/vehicle";

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

const getVehicleDetailsDMT = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getVehicleDetailsDMT",
        data: formData,
    });
};

const getVehicleDetails = (vid, formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getVehicleDetails/" + vid,
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

const assignVehicleToFuelQueue = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/assignFuelQueue",
        data: formData,
    });
}

export {
    isVehicleRegistered,
    isVehicleReal,
    getVehicleDetailsDMT,
    getVehicleDetails,
    registerVehicle,
    assignVehicleToFuelQueue
};