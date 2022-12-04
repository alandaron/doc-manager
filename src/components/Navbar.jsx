import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
	const links = [
		{
			name: "Home",
			to: "/",
		},
		{
			name: "About",
			to: "/about",
		},

		{
			name: "Services",
			to: "/services",
		},
		{
			name: "Login",
			to: "/login",
		},
	];

	useEffect(() => {
		if (
			localStorage.getItem("theme") === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setDarkTheme(true);
			document.documentElement.classList.add("dark");
			console.log("dark");
		} else {
			setDarkTheme(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const [darkTheme, setDarkTheme] = useState(false);

	const changeDarkTheme = () => {
		if (darkTheme) {
			localStorage.theme = "light";
			document.documentElement.classList.remove("dark");
			setDarkTheme(false);
		} else {
			localStorage.theme = "dark";
			document.documentElement.classList.add("dark");
			setDarkTheme(true);
		}
	};

	return (
		<>
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 md:rounded dark:bg-gray-900">
				<div className="container flex flex-wrap items-center justify-between mx-auto">
					<Link to="/" className="flex items-center">
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Document manager
						</span>
					</Link>

					<button
						type="button"
						className="inline-flex md:order-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
						onClick={changeDarkTheme}
					>
						<svg
							className={!darkTheme ? "w-5 h-5" : "hidden"}
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
						</svg>
						<svg
							className={darkTheme ? "w-5 h-5" : "hidden"}
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
					<button
						type="button"
						data-collapse-toggle="mobile-menu"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>

					<div className="hidden w-full md:block md:w-auto" id="mobile-menu">
						<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							{links.map(({ name, to }, index) => (
								<li key={index}>
									<NavLink
										to={to}
										className={({ isActive }) =>
											isActive
												? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
												: "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
										}
									>
										{name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
