import { useEffect, useState } from "react";
import api from "../config/api";

function Create() {
	const [flats, setFlats] = useState([]);
	const [water, setWater] = useState(0);

	const [addedItems, setAddedItems] = useState([]);
	const [months, setMonths] = useState([]);

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		api.get("flats", user).then((res) => {
			setFlats(res.data || []);
		});

		api.get("settings", user).then((res) => {
			setWater(res.data.water || []);
			setAddedItems(res.data.items || []);
		});

		api.get("months", user).then((res) => {
			setMonths(res.data || []);
		});
	}, []);

	const changeNewWater = (id, newWater) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].newWater = Number(newWater);
		setFlats([...flats]);
	};

	const addItem = () => {
		const newItem = {
			id: Math.random() * 9999,
			active: true,
			title: "",
			value: "",
			total: 0,
			share: false,
		};
		setAddedItems([...addedItems, newItem]);
	};

	const removeItem = (id) => {
		const index = addedItems.findIndex((e) => e.id === id);
		addedItems.splice(index, 1);
		setAddedItems([...addedItems]);
	};

	const changeActive = (id, active) => {
		const index = addedItems.findIndex((e) => e.id === id);
		addedItems[index].active = active;
		setAddedItems([...addedItems]);
	};

	const changeTitle = (id, newTitle) => {
		const index = addedItems.findIndex((e) => e.id === id);
		addedItems[index].title = newTitle;
		setAddedItems([...addedItems]);
	};

	const changeValue = (id, newValue) => {
		const index = addedItems.findIndex((e) => e.id === id);
		addedItems[index].value = Number(newValue);
		setAddedItems([...addedItems]);
	};

	const changeShare = (id, share) => {
		const index = addedItems.findIndex((e) => e.id === id);
		addedItems[index].share = share;
		setAddedItems([...addedItems]);
	};

	const save = () => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		const newFlats = flats.map((flat) => {
			return { ...flat, lastWater: flat.newWater, newWater: "" };
		});

		api.put("flats", newFlats, user).then((res) => console.log("FLATS OK!"));

		const month = {
			flats: flats,
			items: addedItems,
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
		};

		months.push(month);

		api.put("months", months, user).then((res) => console.log("OK!"));
	};

	return (
		<div>
			<div className="flex w-full">
				<div className="flex-1 border rounded-lg px-2 mx-2">
					<div className="text-xl p-2 text-center">Korterite veenäidud</div>
					<div className="h-[26rem] overflow-y-scroll mb-2 px-1">
						{flats.map((flat) => (
							<div
								key={flat.id}
								className="flex justify-between p-6 rounded-lg shadow-lg bg-white w-full my-3"
							>
								<div>
									<span className="text-gray-900 text-xl leading-tight font-medium">
										{flat.name}
									</span>
									<span className="text-gray-700 text-sm ml-1 w-28">
										{flat.owner}
									</span>
								</div>
								<div className="w-[60%]">
									<span className="text-gray-700 text-base mr-5">
										Viimane näit:
										<input
											placeholder="0000"
											type="number"
											className="text-gray-700 text-base w-10 ml-1"
											value={flat.lastWater}
											readOnly={true}
										/>
									</span>
									<span className="text-gray-700 text-base ml-4">
										Uus näit:
										<input
											placeholder="0000"
											type="number"
											className="text-gray-700 text-base w-20 ml-1"
											value={flat.newWater}
											onChange={(e) => changeNewWater(flat.id, e.target.value)}
										/>
									</span>
									<span className="text-gray-700 text-base ml-1">
										{flat.newWater > flat.lastWater ? (
											<>{(flat.newWater - flat.lastWater).toFixed(1)} m³</>
										) : (
											<> 0 m³</>
										)}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex-1 border rounded-lg px-2 mx-2">
					<div className="text-xl p-2 text-center">Teenused</div>

					{addedItems.length > 0 && (
						<div className="h-[26rem] overflow-y-scroll mb-2 px-1">
							{addedItems.map((item) => (
								<div
									key={item.id}
									className={
										item.active
											? "flex justify-between p-5 rounded-lg shadow-lg bg-white w-full my-3"
											: "flex justify-between p-5 rounded-lg bg-gray-400  w-full my-3"
									}
								>
									<div className="relative flex items-center">
										<input
											type="checkbox"
											className="hover:cursor-pointer w-4 h-4"
											checked={item.active}
											onChange={(e) => changeActive(item.id, e.target.checked)}
										/>

										<input
											value={item.title}
											disabled={!item.active}
											onChange={(e) => changeTitle(item.id, e.target.value)}
											placeholder="Sisesta pealkiri"
											className="text-gray-900 text-base font-medium ml-2 p-1 w-36 disabled:bg-gray-400"
										/>

										<input
											value={item.value}
											disabled={!item.active}
											onChange={(e) => changeValue(item.id, e.target.value)}
											placeholder="0.00"
											type="number"
											className="text-gray-900 text-base ml-2 p-1 w-24 disabled:bg-gray-400"
										/>
									</div>

									<div className="flex items-center w-30">
										<input
											id={"share" + item.id}
											type="checkbox"
											disabled={!item.active}
											className="hover:cursor-pointer w-4 h-4"
											onChange={(e) => changeShare(item.id, e.target.checked)}
											checked={item.share}
										/>
										<label
											htmlFor={"share" + item.id}
											className="text-gray-900 text-base ml-2 hover:cursor-pointer select-none"
										>
											Jaga kõigi vahel
										</label>
									</div>

									<div className="flex items-center w-36">
										<div className="text-gray-900 text-right text-base w-full">
											{item.share ? (
												<>{(item.value / flats.length).toFixed(2)} € / korter</>
											) : (
												<>{item.value} €</>
											)}
										</div>
									</div>

									<button
										onClick={() => removeItem(item.id)}
										type="button"
										className="button-remove"
									>
										Eemalda
									</button>
								</div>
							))}
						</div>
					)}

					<div
						className={
							addedItems.length > 0
								? "text-center"
								: "flex flex-col items-center justify-center"
						}
					>
						{addedItems.length < 1 && <div>Tühjus. Lisa uus rida!</div>}
						<button
							onClick={addItem}
							type="button"
							className="button mb-2 w-2/4"
						>
							Lisa rida
						</button>
					</div>
				</div>
			</div>

			<div className="flex w-full h-full py-5">
				<div className="flex-1 border rounded-lg mx-2">
					<div className="text-xl p-2 text-center">Kokkuvõte</div>
					<div className="grid grid-cols-4 gap-3 p-3">
						{flats.map((flat) => (
							<div
								key={flat.id}
								className="block p-6 rounded-lg shadow-lg bg-white max-w-sm"
							>
								<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
									{flat.name} ({flat.owner})
								</h5>

								{flat.newWater > flat.lastWater ? (
									<p className="text-gray-700 text-base mb-1">
										<span>Vesi: </span>
										<span>
											{(flat.newWater - flat.lastWater).toFixed(1) * water} €{" "}
										</span>
										<span>
											({(flat.newWater - flat.lastWater).toFixed(1)} m³)
										</span>
									</p>
								) : (
									<p className="text-gray-700 text-base mb-1">Vesi: 0 m³</p>
								)}

								{addedItems
									.filter((item) => item.active === true)
									.map((item) =>
										item.share ? (
											<p key={item.id} className="text-gray-700 text-base mb-1">
												{item.title}: {(item.value / flats.length).toFixed(2)} €
											</p>
										) : (
											<p key={item.id} className="text-gray-700 text-base mb-1">
												{item.title}: {item.value} €
											</p>
										)
									)}
							</div>
						))}
					</div>
					<div className="flex flex-row gap-3 p-3 justify-center">
						<button onClick={save} type="button" className="button mb-2 w-1/4">
							Salvesta
						</button>
						<button type="button" className="button mb-2 w-1/4">
							Laadi PDF arved
						</button>
						<button type="button" className="button mb-2 w-1/4">
							Saada arved e-postiga
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Create;
