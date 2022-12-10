import { createContext, useEffect, useState } from "react";
import api from "../config/api.json";

const AuthContext = createContext(null);
export const AuthContextProvider = (props) => {
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(
		sessionStorage.getItem("user") !== null
	);

	useEffect(() => {
		if (!isLoggedIn) return;
		const user = JSON.parse(sessionStorage.getItem("user")) || [];
		fetch(api.lookUpApiUrl, {
			method: "POST",
			body: JSON.stringify({ idToken: user.token }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (!res.ok) {
				// Lookup ebaõnnestus, ilmselt token'iga probleeme.
				return setIsLoggedIn(false);
			}

			res.json().then((json) => {
				setUser(json.users[0]);
			});
		});
	}, [isLoggedIn]);

	const loginHandler = (idToken, user) => {
		setIsLoggedIn(true);
		setUser(user);

		const userLS = {
			uid: user.reloadUserInfo?.localId || user.localId,
			token: idToken,
		};
		sessionStorage.setItem("user", JSON.stringify(userLS));
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUser({});
		sessionStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider
			value={{
				loggedIn: isLoggedIn,
				user: user,
				setLoggedIn: setIsLoggedIn,
				login: loginHandler,
				logout: logoutHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
