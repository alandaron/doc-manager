import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div>
			<p>Dashboard</p>
			<Link to="create" className="button">
				Create new
			</Link>
			<div>Here are your created documents.</div>
		</div>
	);
}

export default Dashboard;
