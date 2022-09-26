import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  const { user } = useAuth().auth();

  return (user?.role && allowedRoles.includes(user.role) ) ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }}  replace />
  );
};

export default RequireAuth;