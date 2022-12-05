import { initializeApp } from "firebase/app";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthContext from "./store/AuthContext";

function App() {
	const firebaseConfig = {
		apiKey: "AIzaSyCE7u2HKxGNudOnCU3FdyUkYLx2AwX4lxw",
		authDomain: "doc-manager-aron.firebaseapp.com",
		projectId: "doc-manager-aron",
		storageBucket: "doc-manager-aron.appspot.com",
		messagingSenderId: "746373057140",
		appId: "1:746373057140:web:da648b17c66d66b9451f21",
		measurementId: "G-0ZYYGKG91H",
	};

	// Initialize Firebase
	initializeApp(firebaseConfig);

	const authContext = useContext(AuthContext);

	return (
		<div className="h-screen bg-white text-gray-800 dark:text-white dark:bg-gray-900">
			<div className="md:container mx-auto md:py-2">
				<Navbar />

				<Routes>
					<Route path="" element={<Home />} />
					{!authContext.loggedIn && (
						<>
							<Route path="login" element={<Login />} />
							<Route path="dashboard" element={<Navigate to="/login" />} />
						</>
					)}

					{authContext.loggedIn && (
						<>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="login" element={<Navigate to="/dashboard" />} />
						</>
					)}
				</Routes>
			</div>
		</div>
	);
}

export default App;
