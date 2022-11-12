import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/user";

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