import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  const { userID, accessToken } = useAuth().auth();

  try {
    var user = jwtDecode(accessToken);
  } catch (err) {
    var user = null;
  }

  return user != null ? (
    children
  ) : (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;