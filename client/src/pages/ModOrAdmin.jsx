import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ModOrAdmin = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (
  user?.authorities?.includes("ROLE_ADMIN") ||
  user?.authorities?.includes("ROLE_MODERATOR")
) {
  return children;
}

  return <Navigate to="/notallowed" />;
};

export default ModOrAdmin;
