import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@modules/home/pages/Home";
import Login from "@modules/auth/pages/Login";

function App() {
	return (
		<>
			<Routes>
				{/* Public routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
