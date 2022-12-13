import React from "react";

function WaterReading({ flats, changeNewWater }) {
	return (
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
	);
}

export default WaterReading;
