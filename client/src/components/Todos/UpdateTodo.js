import React, { useCallback, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import Card from "../../UiElements/Card";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import "./NewTodo.style.css";

const UpdateTodo = () => {
	const todoId = useParams().todoId;
	const [isLoading, sendRequest] = useFetch();

	const [loadedTodo, setLoadedTodos] = useState(null);

	const [updateState, setUpdateState] = useState({
		title: "",
		category: "",
		body: "",
	});
	const history = useHistory();

	console.log("TODO-ID", todoId);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:9000/api/todos/${todoId}`
				);
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
	const updateTodoSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(`/api/todos/${todoId}`, "PATCH", {
				title: updateState.title,
				category: updateState.category,
				body: updateState.body,
			});
		} catch (error) {
			console.log(error);
		}

		history.push("/");
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
			<Card className="update-todo">
				<form onSubmit={updateTodoSubmitHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="form-control">
						<label htmlFor="title">Title</label>
						{loadedTodo && (
							<input
								type="text"
								id="title"
								name="title"
								value={updateState.title}
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
								value={updateState.category}
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
								value={updateState.body}
								placeholder="body"
								onChange={inputHandler}
							/>
						)}
					</div>
					<button type="submit">Update Task</button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default UpdateTodo;
