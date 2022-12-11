import { useEffect, useState } from "react";
import api from "../config/api";

function Settings() {
	const [addedItems, setAddedItems] = useState([]);
	const [water, setWater] = useState("");

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		api.get("settings", user).then((res) => {
			setAddedItems(res.data.items || []);
			setWater(res.data.water || "");
		});
	}, []);

	const save = () => {
		const user = JSON.parse(sessionStorage.getItem("user")) || [];

		const settings = {
			water: water,
			items: addedItems,
		};

		api
			.put("settings", settings, user)
			.then((res) => setAddedItems([...settings.items]));
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

	return (
		<div>
			<div className="flex w-full">
				<div className="flex-1 border rounded-lg px-2 mx-2">
					<div className="text-xl p-2 text-center">Vesi</div>
					<div className="h-[26rem] overflow-y-hidden mb-2 px-1 ">
						<div className="flex gap-4 p-5 rounded-lg shadow-lg bg-white w-full my-3 text-gray-900">
							<label>Vee hind</label>
							<input
								value={water}
								onChange={(e) => setWater(e.target.value)}
								placeholder="0.00"
								type="number"
								className="text-gray-700 text-base w-auto px-2 border rounded border-gray-700"
							/>
						</div>
					</div>
					<div className="text-center">
						<button
							onClick={save}
							type="button"
							className="button mb-2 mx-1 w-2/5"
						>
							Salvesta
						</button>
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

									<div className="flex items-center w-36"></div>

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
					{addedItems.length < 1 && (
						<div className="flex flex-col items-center justify-center h-[26rem]">
							<div>Tühjus. Lisa uus rida!</div>
						</div>
					)}

					<div className="text-center">
						<button
							onClick={save}
							type="button"
							className="button mb-2 mx-1 w-2/5"
						>
							Salvesta
						</button>
						<button
							onClick={addItem}
							type="button"
							className="button mb-2 mx-1 w-2/5"
						>
							Lisa rida
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
