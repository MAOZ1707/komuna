import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import { TodoContext } from "../../context/TodoContext";
import TodoList from "./TodoList";
import { fetchTodos } from "../../hooks/util/requests";

const UserTodos = () => {
	const { loadedTodos, setLoadedTodos } = useContext(TodoContext);

	const { isLoading, sendRequest, setIsLoading } = useFetch();
	const userId = useParams().userId;

	useEffect(() => {
		const fetchTodosByUserId = async () => {
			try {
				const response = await fetchTodos(userId);
				setLoadedTodos(response);
				setIsLoading(false);
			} catch (err) {
				setLoadedTodos([]);
			}
		};

		fetchTodosByUserId();
	}, [sendRequest, setIsLoading, setLoadedTodos, userId]);

	return (
		<React.Fragment>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && loadedTodos && <TodoList items={loadedTodos} />}
		</React.Fragment>
	);
};

export default UserTodos;
