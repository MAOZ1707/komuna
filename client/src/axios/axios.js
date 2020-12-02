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

export const getHomeById = async (id) => {
	const fetchData = await axios({
		method: "GET",
		url: `http://localhost:9000/api/home/${id}`,
	});
	const response = await fetchData;
	return response.data.data.home;
};
export const getHome = async (path) => {
	const fetchData = await axios({
		method: "GET",
		url: "http://localhost:9000/api/home",
	});
	const response = await fetchData;
	return response.data.data.home;
};

// user fetch
export const createUser = async (data) => {
	try {
		const fetchReq = await axios({
			method: "POST",
			url: "http://localhost:9000/api/user/signup",
			data: {
				firstname: data.firstName,
				lastname: data.lastName,
				email: data.email,
				password: data.password,
				gender: data.gender,
				islogin: data.isLogin,
			},
		});
		const response = await fetchReq;
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const getUsers = async () => {
	const fetchUsers = await axios.get("http://localhost:9000/api/user");
	const response = await fetchUsers;
	return response.data;
};

export const getUserById = async (id) => {
	const fetchUser = await axios.get(`http://localhost:9000/api/user/${id}`);
	const response = await fetchUser;
	return response.data;
};
