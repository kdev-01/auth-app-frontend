import { AuthContext } from "@globals/contexts";
import { LoadingPage } from "@globals/pages";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <LoadingPage />;
	if (user.is_logged) return <Outlet />;
	return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
