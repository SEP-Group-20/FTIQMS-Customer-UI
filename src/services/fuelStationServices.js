import axios from './HttpsServices';

const APIEndPoint = "/api/fuelStation";


const getAllFuelStations = () => {
    return axios({
        method: "get",
        url: APIEndPoint + "/getAllFuelStations",
    });
}
const getFuelStationById = (fuelStationId) => {
    return axios({
        method: "get",
        url: APIEndPoint + `/getFuelStationById/${fuelStationId}`,
    });
}

export { getAllFuelStations, getFuelStationById };