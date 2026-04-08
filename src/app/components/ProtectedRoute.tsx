import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, isConfigured } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-lg">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          <span className="text-sm font-medium text-gray-700">
            Carregando sua sessao...
          </span>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
