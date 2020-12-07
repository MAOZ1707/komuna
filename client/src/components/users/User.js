import Axios from "axios";
import React, { useState, useEffect } from "react";

import UserList from "./components/UserList";

const User = () => {
	const [users, setUsers] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAllUsers = async () => {
			setIsLoading(true);
			const response = await Axios({
				method: "GET",
				url: "http://localhost:9000/api/user",
			});
			const data = await response.data;
			console.log(data);
			setUsers(data.users);
			setIsLoading(false);
		};
		fetchAllUsers();
	}, []);

	return (
		<React.Fragment>
			{isLoading && <div className="center">Loading...</div>}
			{error && <div>{error}</div>}
			{users && <UserList items={users} />}
		</React.Fragment>
	);
};

export default User;
