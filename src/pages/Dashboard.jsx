import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../config/api";

function Dashboard() {
	const [dbMonths, setDbMonths] = useState([]);
	const [months, setMonths] = useState([]);
	const [selectedYear, setSelectedYear] = useState("all");
	const years = [...new Set(dbMonths.map((month) => month.year))];

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];
		api.get("months", user).then((res) => {
			setDbMonths(res.data || []);
			setMonths(res.data || []);
		});
	}, []);

	useEffect(() => {
		if (selectedYear === "all") {
			return setMonths(dbMonths);
		}

		const result = dbMonths.filter(
			(month) => month.year === Number(selectedYear)
		);
		setMonths(result);
	}, [selectedYear, dbMonths]);

	const getMonth = (month) => {
		const date = new Date();
		date.setMonth(month);
		return date.toLocaleString("et-EE", { month: "long" });
	};

	const removeMonth = (month) => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];
		const index = dbMonths.findIndex(
			(element) => month.month === element.month
		);
		const updatedProducts = [...dbMonths];
		updatedProducts.splice(index, 1);

		api.put("months", updatedProducts, user).then((res) => {
			dbMonths.splice(index, 1);
			setDbMonths([...dbMonths]);
		});
	};

	return (
		<div>
			<p>Dashboard</p>
			<select
				onChange={(e) => {
					setSelectedYear(e.target.value);
				}}
				className="text-black px-7 py-3 text-sm leading-snug inline-block rounded"
			>
				<option value="all">Kõik</option>
				{years.map((year) => (
					<option value={year} key={year}>
						{year}
					</option>
				))}
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
									{months
										.sort((a, b) => b.month - a.month)
										.map((element) => (
											<tr className="border-b">
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
													{getMonth(element.month)}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
													<Link to="edit/1" className="px-5">
														Vaata / Muuda
													</Link>
													<Link
														onClick={() => removeMonth(element)}
														className="px-5 text-red-600"
													>
														Kustuta
													</Link>
												</td>
											</tr>
										))}
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
