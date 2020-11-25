import React, { useState, createContext, useEffect } from "react";
import { getUsers } from "../axios/axios";

export const UsersContext = createContext(null);

const UsersContextProvider = ({ children }) => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		const get = async () => {
			const result = await getUsers();
			setUser(result.data.users);
		};
		get();
	}, []);

	return <UsersContext.Provider value={user}>{children}</UsersContext.Provider>;
};

export default UsersContextProvider;
