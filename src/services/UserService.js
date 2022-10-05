import axios from './HttpsServices';

const APIEndPoint = "http://localhost:3001/api/user";

const getUserName = (formData) => {
    return axios({
        method: "post",
        url: APIEndPoint + "/getUsername",
        data: formData,
    });
};

export {getUserName};