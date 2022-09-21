import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = () => {
    try {
      return {
        userID: localStorage.getItem("userID"),
        accessToken: localStorage.getItem("accessToken"),
      };
    } catch (err) {
      return null;
    }
  };
  const setauth = (userID, accessToken) => {
    localStorage.setItem("userID", userID);
    localStorage.getItem("accessToken", accessToken);
  };
  const logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setauth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
