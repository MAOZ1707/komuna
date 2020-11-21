import axios from "axios";

export const createHome = async (data) => {
	const fetchReq = await axios({
		method: "POST",
		url: "http://localhost:9000/api/home",
		data: {
			city: data.city,
			street: data.street,
			houseNumber: Number(data.houseNumber),
			zipCode: Number(data.zipCode),
		},
	});
	const response = await fetchReq;
	console.log(response);
};
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
