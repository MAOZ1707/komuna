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
			isHomeAdded: true,
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
	// console.log(response.data.data.home);
	return response.data.data.home;
};

// user fetch
export const createUser = async (data) => {
	console.log(data);
	const fetchReq = await axios({
		method: "POST",
		url: "http://localhost:9000/api/home",
		// data: {
		// 	city: data.city,
		// 	street: data.street,
		// 	houseNumber: Number(data.houseNumber),
		// 	zipCode: Number(data.zipCode),
		// },
	});
	const response = await fetchReq;
	console.log(response);
};
