import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Services from "../components/Services";
import Summary from "../components/Summary";
import WaterReading from "../components/WaterReading";
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
			// year: 2020,
			month: new Date().getMonth(),
			// month: 3,
		};

		months.push(month);

		api.put("months", months, user).then((res) => console.log("OK!"));
	};

	const getPaymentLink = (amount) => {
		const paymentData = {
			api_username: "92ddcfab96e34a5f",
			account_name: "EUR3D1",
			amount: amount,
			order_reference: new Date().getMonth() + Math.random() * 9999,
			nonce: "a9b7f7e" + Math.random() * 9999 + new Date(),
			timestamp: new Date(),
			customer_url: "http://react-aron-db.web.app/cart",
		};

		const headersData = {
			Authorization:
				"Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
			"Content-Type": "application/json",
			mode: "no-cors",
		};

		return fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
			method: "POST",
			body: JSON.stringify(paymentData),
			headers: headersData,
		})
			.then((res) => res.json())
			.then((json) => {
				return json.payment_link;
			});
	};

	const sendEmailInvoices = () => {
		console.log("SENDING EMAIL INVOICES...");

		const promises = flats.map(async (flat) => {
			let totalPrice = 0;
			addedItems
				.filter((item) => item.active === true)
				.forEach((item) => {
					if (item.share) {
						totalPrice += Number((item.value / flats.length).toFixed(2));
					} else {
						totalPrice += Number(item.value);
					}

					return totalPrice.toFixed(2);
				});

			let waterPrice = 0;
			if (flat.newWater > flat.lastWater) {
				waterPrice =
					Number((flat.newWater - flat.lastWater).toFixed(1)) * water;
			}
			totalPrice += waterPrice;

			const details =
				"<ol>" +
				`<li>Vesi: ${waterPrice} € (${
					flat.newWater - flat.lastWater
				} m³)</li>` +
				addedItems
					.filter((item) => item.active === true)
					.map((item) =>
						item.share
							? `<li>${item.title}: ${(item.value / flats.length).toFixed(
									2
							  )} €</li>`
							: `<li>${item.title}: ${item.value} €</li>`
					)
					.join("") +
				"</ol>";

			const paymentLink = await getPaymentLink(totalPrice);

			const emailParams = {
				owner: flat.owner,
				owner_email: flat.email,
				payment_link: paymentLink,
				invoice_details: details,
				price: totalPrice.toFixed(2),
			};

			return await emailjs.send(
				"service_ta6m2jm",
				"template_mux3ouj",
				emailParams,
				"UlgAUKrcUibqNfAnn"
			);
		});
		Promise.all(promises).then((res) => {
			console.log(res);
		});
	};

	return (
		<div>
			<div className="flex w-full">
				<div className="flex-1 border rounded-lg px-2 mx-2">
					<div className="text-xl p-2 text-center">Korterite veenäidud</div>
					<WaterReading flats={flats} changeNewWater={changeNewWater} />
				</div>
				<div className="flex-1 border rounded-lg px-2 mx-2">
					<div className="text-xl p-2 text-center">Teenused</div>

					{addedItems.length > 0 && (
						<Services
							flats={flats}
							addedItems={addedItems}
							changeActive={changeActive}
							changeShare={changeShare}
							changeTitle={changeTitle}
							changeValue={changeValue}
							removeItem={removeItem}
						/>
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
						<Summary flats={flats} addedItems={addedItems} waterPrice={water} />
					</div>
					<div className="flex flex-row gap-3 p-3 justify-center">
						<button onClick={save} type="button" className="button mb-2 w-1/4">
							Salvesta
						</button>
						<button type="button" className="button mb-2 w-1/4">
							Laadi PDF arved
						</button>
						<button
							onClick={sendEmailInvoices}
							type="button"
							className="button mb-2 w-1/4"
						>
							Saada arved e-postiga
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Create;
