import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const AdminPage = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ตรวจสอบสิทธิ์ admin
  const isAdmin =
    user?.authorities?.includes("ROLE_ADMIN") ||
    user?.roles?.includes("ADMIN");

  if (isAdmin) {
    return children;
  }

  return <Navigate to="/notallowed" />;
};

export default AdminPage;
