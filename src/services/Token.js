import jwtDecode from "jwt-decode";

const setAccessToken = (value) => {
  localStorage.setItem("accessToken", value);
};

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
}

const getAuth = () => {
  const jwt = localStorage.getItem("accessToken");

  try {
    const user = jwtDecode(jwt).userInfo;
    return user;
  } catch (err) {
    return null;
  }
}

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  getAuth
};