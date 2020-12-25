import React, { useCallback, useState, useContext } from "react";
import moment from "moment";

import { useHistory } from "react-router-dom";
import Card from "../../UiElements/Card";
import { AuthContext } from "../../context/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../../UiElements/ErrorModal";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import Button from "../../FormElements/Button";
import newTodoImage from "../../assets/img/new-todo.svg";

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
					createAt: moment().calendar(),
					isComplete: false,
					creator: authContext.userId,
				},
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + authContext.token,
				}
			);

			history.push(`/${authContext.userId}/todos`);
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className="new-todo">
				<form className="todo-form" onSubmit={creatTodoSubmitHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className="form-control form-control-radio">
						<label htmlFor="shopping" className="radio">
							<input
								type="radio"
								id="shopping"
								name="category"
								value="Shopping"
								onChange={inputHandler}
							/>
							<div className="radio__check"></div>
							<span>Shopping</span>
						</label>
						<label htmlFor="payments" className="radio">
							<input
								type="radio"
								id="payments"
								name="category"
								value="Payments"
								onChange={inputHandler}
							/>
							<div className="radio__check"></div>
							<span>Payments</span>
						</label>
						<label htmlFor="outers" className="radio">
							<input
								type="radio"
								id="outers"
								name="category"
								value="Outers"
								onChange={inputHandler}
							/>
							<div className="radio__check"></div>
							<span>Outers</span>
						</label>
					</div>
					{formState.category === "Outers" && (
						<div className="form-control">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formState.title}
								onChange={inputHandler}
							/>
						</div>
					)}
					<div className="form-control">
						<label htmlFor="body">body</label>
						<textarea
							type="textarea"
							className="body-text"
							id="body"
							name="body"
							value={formState.body}
							onChange={inputHandler}
						/>
					</div>

					<Button create type="submit">
						Create Task
					</Button>
				</form>
				<div className="new-todo-image-controller">
					<img src={newTodoImage} alt="todo" className="new-todo-image" />
				</div>
			</Card>
		</React.Fragment>
	);
};

export default NewTodos;
