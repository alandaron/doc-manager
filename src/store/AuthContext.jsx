import { createContext, useEffect, useState } from "react";
import api from "../config/api.json";

const AuthContext = createContext(null);
export const AuthContextProvider = (props) => {
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(
		sessionStorage.getItem("token") !== null
	);

	useEffect(() => {
		if (!isLoggedIn) return;

		fetch(api.lookUpApiUrl, {
			method: "POST",
			body: JSON.stringify({ idToken: sessionStorage.getItem("token") }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((json) => {
				setUser(json.users[0]);
			});
	}, [isLoggedIn]);

	const loginHandler = (idToken, user) => {
		setIsLoggedIn(true);
		setUser(user);
		sessionStorage.setItem("token", idToken);
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUser({});
		sessionStorage.removeItem("token");
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
