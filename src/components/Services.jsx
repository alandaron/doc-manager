import React from "react";

function Services({
	flats,
	addedItems,
	changeActive,
	changeShare,
	changeTitle,
	changeValue,
	removeItem,
}) {
	return (
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
	);
}

export default Services;
