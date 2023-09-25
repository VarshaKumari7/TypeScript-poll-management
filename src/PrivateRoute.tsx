import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let isAuthenticated;
  return isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
