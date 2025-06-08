import { Routes, Route } from "react-router-dom";
import Home from "./modules/home/pages/Home";

function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<Home />} />
		</Routes>
	);
}

export default App;
