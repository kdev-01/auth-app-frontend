import { AuthContext } from "@globals/contexts";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <h1>Cargando...</h1>;
	if (user.is_logged) return <Outlet />;
	return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
