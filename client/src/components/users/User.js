import React from "react";

import UserList from "./components/UserList";

const User = () => {
	const USERS = [
		{
			id: "u1",
			name: "User 1",
			image:
				" https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		},
		{
			id: "u2",
			name: "User 2",
			image:
				" https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		},
	];

	return <UserList items={USERS} />;
};

export default User;
