import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import { TodoContext } from "../../context/TodoContext";

import TodoList from "./TodoList";

const UserTodos = () => {
	const { loadedTodos, setLoadedTodos } = useContext(TodoContext);

	const { isLoading, sendRequest } = useFetch();
	const userId = useParams().userId;

	useEffect(() => {
		const fetchTodosByUserId = async () => {
			try {
				// Todo ---- fix the error modal if
				const responseData = await sendRequest(`http://localhost:9000/api/todos/user/${userId}`);
				setLoadedTodos(responseData.todos);
			} catch (err) {
				console.log(err);
			}
		};

		fetchTodosByUserId();
	}, [sendRequest, setLoadedTodos, userId]);

	return (
		<React.Fragment>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && loadedTodos && <TodoList items={loadedTodos} />}
		</React.Fragment>
	);
};

export default UserTodos;
