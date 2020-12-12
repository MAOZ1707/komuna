import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../../UiElements/ErrorModal";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import TodoList from "./TodoList";

const UserTodos = () => {
	const [error, isLoading, sendRequest, clearError] = useFetch();
	const [loadedTodos, setLoadedTodos] = useState([]);
	const userId = useParams().userId;

	useEffect(() => {
		const fetchTodosByUserId = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:9000/api/todos/user/${userId}`
				);
				setLoadedTodos(responseData.todos);
			} catch (err) {
				console.log(err);
			}
		};

		fetchTodosByUserId();
	}, [sendRequest, userId]);

	const deleteTodo = (todoId) => {
		setLoadedTodos((prevState) =>
			prevState.filter((todo) => todo.id !== todoId)
		);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && loadedTodos && (
				<TodoList onDelete={deleteTodo} items={loadedTodos} />
			)}
		</React.Fragment>
	);
};

export default UserTodos;
