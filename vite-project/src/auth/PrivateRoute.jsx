import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
