import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found, redirecting to login...");
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    return decoded.role === "Admin" ? children : <Navigate to="/" />;
  } catch (error) {
    console.error("JWT decode error:", error);
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
