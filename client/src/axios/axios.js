import axios from "axios";

export const createHome = async (data) => {
	console.log(data);
	const fetchReq = await axios({
		method: "POST",
		url: "http://localhost:9000/api/home",
		data: {
			city: data.city,
			street: data.street,
			houseNumber: Number(data.houseNumber),
			zipCode: Number(data.zipCode),
			isHomeAdded: !data.isHomeAdded,
		},
	});
	const response = await fetchReq;
	console.log(response);
};

export const getHome = async () => {
	const fetchData = await axios({
		method: "GET",
		url: "http://localhost:9000/api/home",
	});
	const response = await fetchData;
	return response.data.data.home;
};

// user fetch
export const createUser = async (data) => {
	console.log(data);
	const fetchReq = await axios({
		method: "POST",
		url: "http://localhost:9000/api/user",
		data: {
			firstname: data.firstName,
			lastname: data.lastName,
			age: Number(data.age),
			gender: data.gender,
			islogin: !data.isLogin,
		},
	});
	const response = await fetchReq;
	console.log(response);
};

export const getUsers = async () => {
	const fetchUser = await axios.get("http://localhost:9000/api/user");
	const response = await fetchUser;
	return response.data;
};
