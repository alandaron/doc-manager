import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div>
			<p>Dashboard</p>
			<select className="text-black px-7 py-3 text-sm leading-snug inline-block rounded">
				<option>2022</option>
				<option>2021</option>
			</select>

			<Link to="create" className="button ml-2">
				Uus kuu
			</Link>
			<Link to="flats" className="button ml-2">
				Korterid
			</Link>
			<Link to="settings" className="button ml-2">
				Sätted
			</Link>
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full border text-center bg-white">
								<thead className="border-b">
									<tr>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
										>
											Kuu
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4"
										>
											Toimingud
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="border-b">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
											Detsember
										</td>
										<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
											<Link to="edit/1" className="px-5">
												Vaata / Muuda
											</Link>
											<Link className="px-5 text-red-600">Kustuta</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
