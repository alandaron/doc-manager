import { useEffect, useState } from "react";
import api from "../config/api.json";

function Flats() {
	const [flats, setFlats] = useState([]);

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		const fetchHeaders = {
			"Content-Type": "application/json",
		};

		fetch(api.flatsApiUrl + user.uid + ".json?auth=" + user.token, {
			headers: fetchHeaders,
		})
			.then((res) => res.json())
			.then((json) => {
				setFlats(json || []);
			});
	}, []);

	const changeOwner = (id, newOwner) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].owner = newOwner;
		setFlats([...flats]);
	};

	const changeName = (id, newName) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].name = newName;
		setFlats([...flats]);
	};

	const changeEmail = (id, newEmail) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].email = newEmail;
		setFlats([...flats]);
	};

	const changeLastWater = (id, newLastWater) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].lastWater = Number(newLastWater);
		setFlats([...flats]);
	};

	const addNewFlat = () => {
		const newFlat = {
			id: Math.random() * 9999,
			name: "Korter " + (flats.length + 1).toString(),
			owner: "",
			email: "",
			lastWater: "",
			newWater: "",
		};
		flats.push(newFlat);

		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		const fetchHeaders = {
			"Content-Type": "application/json",
		};
		fetch(api.flatsApiUrl + user.uid + ".json?auth=" + user.token, {
			method: "PUT",
			body: JSON.stringify(flats),
			headers: fetchHeaders,
		}).then((res) => setFlats([...flats]));
	};

	const deleteFlat = (flat) => {
		const flatIndex = flats.findIndex((element) => element.id === flat.id);
		const updatedFlats = [...flats];
		updatedFlats.splice(flatIndex, 1);

		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		fetch(api.flatsApiUrl + user.uid + ".json?auth=" + user.token, {
			method: "PUT",
			body: JSON.stringify(updatedFlats),
		}).then(() => {
			setFlats([...updatedFlats]);
		});
	};

	const saveFlat = () => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		fetch(api.flatsApiUrl + user.uid + ".json?auth=" + user.token, {
			method: "PUT",
			body: JSON.stringify(flats),
		}).then(() => {
			setFlats([...flats]);
		});
	};

	return (
		<div>
			<p>Korterid</p>

			<div className="grid grid-cols-4 gap-3 p-3">
				{flats.map((flat) => (
					<div
						key={flat.id}
						className="block p-6 rounded-lg shadow-lg bg-white max-w-sm h-48"
					>
						<div className="text-gray-900 text-xl leading-tight font-medium mb-2">
							<input
								className="w-28 pb-0.5"
								value={flat.name}
								placeholder="Korter"
								onChange={(e) => changeName(flat.id, e.target.value)}
							/>
							(
							<input
								className="text-gray-700 text-base w-36 text-center px-2"
								value={flat.owner}
								placeholder="Omanik"
								onChange={(e) => changeOwner(flat.id, e.target.value)}
							/>
							)
						</div>

						<label className="text-gray-700 text-base">E-post:</label>
						<input
							type="email"
							className="text-gray-700 text-base ml-1 my-1"
							value={flat.email}
							placeholder="Sisesta e-posti aadress"
							onChange={(e) => changeEmail(flat.id, e.target.value)}
						/>
						<br />
						<label className="text-gray-700 text-base">Viimane näit:</label>
						<input
							type="email"
							className="text-gray-700 text-base ml-1 mb-2"
							value={flat.lastWater}
							placeholder="0000"
							onChange={(e) => changeLastWater(flat.id, e.target.value)}
						/>
						<br />

						<button type="button" className="button-add" onClick={saveFlat}>
							Salvesta
						</button>
						<button
							onClick={() => deleteFlat(flat)}
							type="button"
							className="button-remove ml-2"
						>
							Eemalda
						</button>
					</div>
				))}

				<div
					onClick={addNewFlat}
					className="group flex rounded-lg shadow-lg bg-gray-700 max-w-sm h-48 hover:bg-gray-100 hover:cursor-pointer justify-center items-center"
				>
					<div className="group-hover:text-black text-gray-300 ">Lisa uus</div>
				</div>
			</div>
		</div>
	);
}

export default Flats;
