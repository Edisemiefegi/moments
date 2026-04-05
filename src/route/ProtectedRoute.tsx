import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "@/store/Store";

function ProtectedRoute() {
  const { currentUser } = useStore();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;