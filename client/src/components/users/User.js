import React, { useState, useEffect } from "react";

import LoadingSpinner from "../../UiElements/LoadingSpinner";
import ErrorModal from "../../UiElements/ErrorModal";

import UserList from "./components/UserList";
import { useFetch } from "../../hooks/useFetch";

const User = () => {
	const [users, setUsers] = useState(null);
	const { error, isLoading, sendRequest, clearError } = useFetch();

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const responseData = await sendRequest("/api/user");
				setUsers(responseData.users);
			} catch (error) {}
		};
		fetchAllUsers();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{error && <div>{error}</div>}
			{users && <UserList items={users} />}
		</React.Fragment>
	);
};

export default User;
