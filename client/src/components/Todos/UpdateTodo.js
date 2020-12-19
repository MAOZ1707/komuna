import React, { useCallback, useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";
import Card from "../../UiElements/Card";
import editTodo from "../../assets/img/edit-todo.svg";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import Button from "../../FormElements/Button";
import { AuthContext } from "../../context/AuthContext";

import "./NewTodo.style.css";

const UpdateTodo = () => {
	const todoId = useParams().todoId;
	const { userId } = useContext(AuthContext);
	const history = useHistory();
	const { isLoading, sendRequest } = useFetch();
	const [loadedTodo, setLoadedTodos] = useState(null);
	const [updateState, setUpdateState] = useState({
		title: "",
		body: "",
	});

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const responseData = await sendRequest(`/api/todos/${todoId}`);
				setLoadedTodos(responseData.todo);
				setUpdateState({
					title: responseData.todo.title,
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

		history.push(`/${userId}/todos`);
	};

	if (!loadedTodo) {
		return (
			<div className="center">
				<LoadingSpinner asOverlay />
			</div>
		);
	}

	console.log("Update-Todo", loadedTodo.category);
	return (
		<React.Fragment>
			<Card className="update-todo">
				<form onSubmit={updateTodoSubmitHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					{loadedTodo && <h4 className="category-title">{loadedTodo.category}</h4>}
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
						<label htmlFor="body">Body</label>
						{loadedTodo && (
							<textarea
								type="textarea"
								id="body"
								name="body"
								value={updateState.body}
								placeholder="body"
								onChange={inputHandler}
							/>
						)}
					</div>
					<Button edit type="submit">
						Update
					</Button>
				</form>

				<div className="edit-todo-image-controller">
					<img src={editTodo} alt="edit" className="edit-todo-image" />
				</div>
			</Card>
		</React.Fragment>
	);
};

export default UpdateTodo;
