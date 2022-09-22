import { createContext, useContext } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const user = jwtDecode(accessToken).userInfo;
      return {accessToken,user}

    } catch (err) {
      return {user:null, accessToken:null};
    }
  };
  const setAuth = ( accessToken) => {
    localStorage.setItem("accessToken", accessToken);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
