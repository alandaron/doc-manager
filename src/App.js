import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
	return (
		<div className="h-screen bg-white text-gray-800 dark:text-white dark:bg-gray-900">
			<div className="md:container mx-auto md:py-2">
				<Navbar />

				<Routes>
					<Route path="" element={<Home />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
