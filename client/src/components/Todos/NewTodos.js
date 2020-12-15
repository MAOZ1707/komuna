import React, { useCallback, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../UiElements/Card";
import { AuthContext } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../../UiElements/ErrorModal";
import LoadingSpinner from "../../UiElements/LoadingSpinner";

import "./NewTodo.style.css";

const NewTodos = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const [formState, setFormState] = useState({
		title: "",
		category: "",
		body: "",
	});

	const { error, isLoading, sendRequest, clearError } = useFetch();
	const inputHandler = useCallback(
		(e) => {
			setFormState({
				...formState,
				[e.target.name]: e.target.value,
			});
		},
		[formState]
	);

	const creatTodoSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				"http://localhost:9000/api/todos",
				"POST",
				{
					title: formState.title,
					category: formState.category,
					body: formState.body,
					createAt: new Date().getDate(),
					isComplete: false,
					creator: authContext.userId,
				},
				{
					"Content-Type": "application/json",
				}
			);

			history.push("/");
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className="new-todo">
				<form className="place-form" onSubmit={creatTodoSubmitHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="form-control">
						<label htmlFor="category">Category</label>
						<input
							type="text"
							id="category"
							name="category"
							value={formState.category}
							placeholder="category"
							onChange={inputHandler}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							id="title"
							name="title"
							value={formState.title}
							placeholder="title"
							onChange={inputHandler}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="body">body</label>
						<input
							type="text"
							id="body"
							name="body"
							value={formState.body}
							placeholder="body"
							onChange={inputHandler}
						/>
					</div>

					<button type="submit">Create Task</button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default NewTodos;
