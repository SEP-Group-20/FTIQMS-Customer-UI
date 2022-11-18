import axios from './HttpsServices';

const APIEndPoint = "/api/user";

const getUserName = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getUsername",
        data: formData,
    });
};

const getUser = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getUserByNIC",
        data: formData,
    });
}

const getUserDetails = () => {
    return axios({
        method: "get",
        url: APIEndPoint + "/getUserDetails",
    });
}

export {getUserName, getUser,getUserDetails};
const getUserFuelStations = () => {
    return axios({
        method: "get",
        url: APIEndPoint + "/getSelectedFuelStations",
    });
}


const setUserFuelStations = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/setSelectedFuelStations",
        data: formData,
    });
}


export { getUserName, getUser, getUserFuelStations, setUserFuelStations };
