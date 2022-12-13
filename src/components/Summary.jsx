import React from "react";

function Summary({ flats, addedItems, waterPrice }) {
	return (
		<>
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
								{(flat.newWater - flat.lastWater).toFixed(1) * waterPrice} €{" "}
							</span>
							<span>({(flat.newWater - flat.lastWater).toFixed(1)} m³)</span>
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
		</>
	);
}

export default Summary;
