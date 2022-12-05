import { useContext } from "react";
import AuthContext from "../store/AuthContext";

function Dashboard() {
	const authContext = useContext(AuthContext);

	return (
		<div>
			<p>Dashboard</p>
			<button onClick={() => authContext.logout()}>Logout</button>
		</div>
	);
}

export default Dashboard;
