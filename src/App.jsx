import ProtectedRoute from "@globals/components/atoms/ProtectedRoute";
import Login from "@modules/auth/pages/Login";
import DashboardLayout from "@modules/dashboard/components/templates/DashboardLayout";
import Home from "@modules/home/pages/Home";
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
						<Route path="/dashboard/users" element={<h1>Users</h1>} />
					</Route>
				</Route>
			</Routes>
			<Toaster richColors position="top-right" />
		</>
	);
}

export default App;
