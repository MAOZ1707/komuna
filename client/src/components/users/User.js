import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import ErrorModal from "../../UiElements/ErrorModal";
import UserList from "./components/UserList";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

const User = () => {
	const authContext = useContext(AuthContext);
	const userContext = useContext(UserContext);

	const { error, isLoading, sendRequest, clearError, setIsLoading } = useFetch();

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const responseData = await sendRequest("/api/user", "GET", null, {
					Authorization: "Bearer " + authContext.token,
				});

				userContext.setUsers(responseData.users);
				console.log(responseData);
				setIsLoading(false);
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
			{userContext.users && !isLoading && <UserList items={userContext.users} />}
		</React.Fragment>
	);
};

export default User;
