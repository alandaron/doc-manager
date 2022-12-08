import { useState } from "react";

function Create() {
	const products = [
		{
			id: 0,
			name: "product #1",
			price: 25.3,
		},
		{
			id: 1,
			name: "product #2",
			price: 25.3,
		},
		{
			id: 2,
			name: "product #3",
			price: 25.3,
		},
	];

	const [addedItems, setAddedItems] = useState([]);

	const addItem = (item) => {
		const itemIndex = addedItems.findIndex((e) => e.id === item.id);
		if (itemIndex === -1) {
			const newItem = { ...item, count: 1 };
			console.log(newItem);
			setAddedItems([...addedItems, newItem]);
		} else {
			addedItems[itemIndex].count += 1;
			setAddedItems([...addedItems]);
		}
	};

	const removeItem = (item) => {
		const index = addedItems.indexOf(item);
		addedItems.splice(index, 1);
		setAddedItems([...addedItems]);
	};

	return (
		<div className="flex w-full">
			<div className="flex-initial w-[40%] border rounded-lg px-2 mx-2">
				<div className="text-xl p-2 text-center">Select your items</div>
				{products.map((product) => (
					<div
						key={product.id}
						className="flex justify-between p-6 rounded-lg shadow-lg bg-white w-full my-3"
					>
						<div>
							<span className="text-gray-900 text-xl leading-tight font-medium">
								{product.name}
							</span>
							<span className="text-gray-700 text-base ml-4">
								{product.price} €
							</span>
						</div>

						<button
							onClick={() => addItem(product)}
							type="button"
							className="button-add"
						>
							Add
						</button>
					</div>
				))}
			</div>
			<div className="flex-1 border rounded-lg px-2 mx-2">
				{addedItems.length < 1 && (
					<div className="flex text-center justify-center w-full h-full items-center">
						<p>Items added are here.</p>
					</div>
				)}
				{addedItems.length > 0 && (
					<div className="text-xl p-2 text-center">Selected items</div>
				)}
				{addedItems.length > 0 &&
					addedItems.map((item) => (
						<div
							key={item.id}
							className="flex justify-between p-6 rounded-lg shadow-lg bg-white w-full my-3"
						>
							<div>
								<span className="text-gray-900 text-xl leading-tight font-medium">
									{item.name}
								</span>
								<span className="text-gray-700 text-base ml-4">
									{item.price} €
								</span>
							</div>
							<div className="text-gray-700">{item.count} tk</div>
							<button
								onClick={() => removeItem(item)}
								type="button"
								className="button-remove"
							>
								Remove
							</button>
						</div>
					))}
			</div>
		</div>
	);
}

export default Create;
