import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
	return (
		<div className="md:container mx-auto md:my-2">
			<Navbar />

			<Routes>
				<Route path="" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
