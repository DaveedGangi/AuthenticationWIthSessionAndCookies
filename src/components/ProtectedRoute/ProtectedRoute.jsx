import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../Api";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);   // loading state
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/dashboard", { withCredentials: true });
        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);   // stop loading after check
      }
    };
    checkAuth();
  }, []);

  //  While checking, only show loading (no login page flicker)
  if (loading) return <p>Loading...</p>;

  return authenticated ? children : <Navigate to="/login-signup" replace />;
};

export default ProtectedRoute;
