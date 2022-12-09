import { useState } from "react";

function Create() {
	const [flats, setFlats] = useState([
		{
			id: 0,
			name: "Korter 1",
			owner: "Kirstjan Jõekalda",
			lastWater: 123,
			newWater: undefined,
		},
		{
			id: 1,
			name: "Korter 2",
			owner: "Kirstjan Jõekalda",

			lastWater: 224,
			newWater: undefined,
		},
		{
			id: 2,
			name: "Korter 3",
			owner: "Kirstjan Jõekalda",

			lastWater: 39,
			newWater: undefined,
		},
		{
			id: 3,
			name: "Korter 4",
			owner: "Kirstjan Jõekalda",

			lastWater: 5,
			newWater: undefined,
		},
		{
			id: 4,
			name: "Korter 5",
			owner: "Kirstjan Jõekalda",

			lastWater: 5,
			newWater: undefined,
		},
		{
			id: 5,
			name: "Korter 6",
			owner: "Kirstjan Jõekalda",

			lastWater: 5,
			newWater: undefined,
		},
		{
			id: 6,
			name: "Korter 7",
			owner: "Kirstjan Jõekalda",

			lastWater: 5,
			newWater: undefined,
		},
		{
			id: 7,
			name: "Korter 8",
			owner: "Kirstjan Jõekalda",

			lastWater: 5,
			newWater: undefined,
		},
	]);

	const [addedItems, setAddedItems] = useState([]);
	const [lastID, setLastID] = useState(0);

	const changeNewWater = (id, newWater) => {
		const index = flats.findIndex((e) => e.id === id);
		flats[index].newWater = newWater;
		setFlats([...flats]);
	};

	const addItem = () => {
		setLastID((prev) => prev + 1);
		const newItem = {
			id: lastID,
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
		addedItems[index].value = newValue;
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
					<div className="text-xl p-2 text-center">Korterid</div>
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
									<span className="text-gray-700 text-sm ml-1">
										{flat.owner}
									</span>
									<span className="text-gray-700 text-base ml-4">
										Viimane näit: {flat.lastWater}
									</span>
								</div>
								<div className="w-64">
									<span className="text-gray-700 text-base ml-4">
										Uus näit:
										<input
											placeholder="0000"
											type="number"
											className="text-gray-700 text-base w-24 ml-1"
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
					<div className="text-xl p-2 text-center">Lisad</div>

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
							<div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
								<h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
									{flat.name} ({flat.owner})
								</h5>
								<p class="text-gray-700 text-base mb-1">
									{flat.newWater > flat.lastWater ? (
										<>Vesi: {(flat.newWater - flat.lastWater).toFixed(1)} m³</>
									) : (
										<>Vesi: 0 m³</>
									)}
								</p>

								{addedItems
									.filter((item) => item.active === true)
									.map((item) =>
										item.share ? (
											<p class="text-gray-700 text-base mb-1">
												{item.title}: {(item.value / flats.length).toFixed(2)} €
											</p>
										) : (
											<p class="text-gray-700 text-base mb-1">
												{item.title}: {item.value} €
											</p>
										)
									)}

								<button
									type="button"
									class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								>
									Button
								</button>
							</div>
						))}
					</div>
					<div className="flex flex-row gap-3 p-3 justify-center">
						<button type="button" className="button mb-2 w-1/4">
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
