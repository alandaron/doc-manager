const apiUrl =
	"https://doc-manager-aron-default-rtdb.europe-west1.firebasedatabase.app/";

// const user = JSON.parse(sessionStorage.getItem("user")) || [];

const headersData = {
	"Content-Type": "application/json",
};

/**
 * GET requests
 *
 * @param  {String} endpoint
 * @param  {Object} params
 *
 * @return {Object}
 */

const get = (endpoint, user) => {
	return fetch(
		apiUrl + endpoint + "/" + user.uid + ".json?auth=" + user.token,
		{
			method: "GET",
			headers: headersData,
		}
	).then((res) =>
		res.json().then((json) => ({
			headers: res.headers,
			status: res.status,
			data: json,
		}))
	);
};

/**
 * PUT requests
 *
 * @param  {String} endpoint
 * @param  {Object} data
 * @param  {Object} params
 *
 * @return {Object}
 */

const put = (endpoint, data, user) => {
	return fetch(
		apiUrl + endpoint + "/" + user.uid + ".json?auth=" + user.token,
		{
			method: "PUT",
			headers: headersData,
			body: JSON.stringify(data),
		}
	).then((res) =>
		res.json().then((json) => ({
			headers: res.headers,
			status: res.status,
			data: json,
		}))
	);
};

const api = { get, put };
export default api;
