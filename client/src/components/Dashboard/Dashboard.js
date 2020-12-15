import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import "./Dashboard.style.css";
import UserProfileBox from "./UserProfileBox";

const Dashboard = () => {
	const userId = useParams().userId;
	const [user, setUser] = useState();

	const { isLoading, sendRequest } = useFetch();

	useEffect(() => {
		const fetchTodosByUserId = async () => {
			try {
				const responseData = await sendRequest(`/api/user/${userId}`);
				setUser(responseData.data.user);
			} catch (err) {
				console.log(err);
			}
		};

		fetchTodosByUserId();
	}, [sendRequest, userId]);

	return (
		<React.Fragment>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && user && (
				<div className="user-dashboard--container">
					<UserProfileBox firstName={user.firstname} email={user.email} lastName={user.lastname} />
				</div>
			)}
		</React.Fragment>
	);
};

export default Dashboard;
