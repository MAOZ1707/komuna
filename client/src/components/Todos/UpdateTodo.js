import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import "./NewTodo.style.css";

const UpdateTodo = () => {
	const todoId = useParams().todoId;
	const [error, isLoading, sendRequest, clearError] = useFetch();
	const [loadedTodo, setLoadedTodos] = useState(null);

	const [updateState, setUpdateState] = useState({
		title: "",
		category: "",
		body: "",
	});
	console.log("TODO-ID", todoId);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const responseData = await sendRequest(`http://localhost:9000/api/todos/${todoId}`);
				console.log(responseData);
				setLoadedTodos(responseData.todo);
				setUpdateState({
					title: responseData.todo.title,
					category: responseData.todo.category,
					body: responseData.todo.body,
				});
			} catch (error) {
				console.log(error);
			}
		};
		fetchTodo();
	}, [setUpdateState, sendRequest, todoId]);

	const inputHandler = useCallback(
		(e) => {
			setUpdateState({
				...updateState,
				[e.target.name]: e.target.value,
			});
		},
		[updateState]
	);

	const updateTodoSubmitHandler = (event) => {
		event.preventDefault();
		console.log(updateState); // TODO -- SAVE TO DATABASE
	};

	if (!loadedTodo) {
		return (
			<div className="center">
				<LoadingSpinner asOverlay />
			</div>
		);
	}

	return (
		<React.Fragment>
			<form onSubmit={updateTodoSubmitHandler}>
				<div className="form-control">
					<label htmlFor="title">Title</label>
					{loadedTodo && (
						<input
							type="text"
							id="title"
							name="title"
							value={loadedTodo.title}
							placeholder="title"
							onChange={inputHandler}
						/>
					)}
				</div>
				<div className="form-control">
					<label htmlFor="category">Category</label>
					{loadedTodo && (
						<input
							type="text"
							id="category"
							name="category"
							value={loadedTodo.category}
							placeholder="category"
							onChange={inputHandler}
						/>
					)}
				</div>
				<div className="form-control">
					<label htmlFor="body">Body</label>
					{loadedTodo && (
						<input
							type="text"
							id="body"
							name="body"
							value={loadedTodo.body}
							placeholder="body"
							onChange={inputHandler}
						/>
					)}
				</div>
				<button type="submit">Update Task</button>
			</form>
		</React.Fragment>
	);
};

export default UpdateTodo;
