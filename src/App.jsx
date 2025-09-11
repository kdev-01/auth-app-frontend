import { ProtectedRoute } from "@globals/components";
import Login from "@modules/auth/pages/Login";
import DashboardLayout from "@modules/dashboard/components/templates/DashboardLayout";
import Home from "@modules/home/pages/Home";
import InstitutionManagement from "@modules/institutions/pages/InstitutionManagement";
import UserManagement from "@modules/users/pages/UserManagement";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

				{/* Protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<DashboardLayout />}>
						<Route path="/dashboard" element={<h1>Home</h1>} />
						<Route path="/dashboard/users" element={<UserManagement />} />
						<Route
							path="/dashboard/institutions"
							element={<InstitutionManagement />}
						/>
					</Route>
				</Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
