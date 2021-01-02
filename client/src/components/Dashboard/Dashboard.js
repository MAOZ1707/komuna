import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import { TodoContext } from "../../context/TodoContext";
import "./Dashboard.style.css";
import UserProfileBox from "./UserProfileBox";
import TodoFilterList from "../Dashboard/TodoFilterList";

const Dashboard = () => {
	const { loadedTodos, setLoadedTodos } = useContext(TodoContext);
	const userId = useParams().userId;
	const [user, setUser] = useState();

	const { isLoading, sendRequest, setIsLoading } = useFetch();

	useEffect(() => {
		const fetchUserById = async () => {
			try {
				const responseData = await sendRequest(`/api/user/${userId}`);
				setUser(responseData.data.user);
				setIsLoading(false);
			} catch (err) {}
		};

		fetchUserById();
	}, [sendRequest, setIsLoading, userId]);

	useEffect(() => {
		const fetchTodosByUserId = async () => {
			try {
				const responseData = await sendRequest(`/api/todos/user/${userId}`);
				setLoadedTodos(responseData.todos);
				setIsLoading(false);
			} catch (err) {}
		};

		fetchTodosByUserId();
	}, [sendRequest, setIsLoading, setLoadedTodos, userId]);

	return (
		<React.Fragment>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && user && (
				<div className="user-dashboard--container">
					<UserProfileBox
						firstName={user.firstname}
						email={user.email}
						lastName={user.lastname}
						todosNumber={loadedTodos.length}
					/>
					<TodoFilterList userTodos={loadedTodos} />
				</div>
			)}
		</React.Fragment>
	);
};

export default Dashboard;
