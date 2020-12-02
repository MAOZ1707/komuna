import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import "./NewTodo.style.css";

const DUMMY_TODOS = [
	{
		id: 1,
		category: "Shopping",
		title: "Go to shopping",
		body: "buy Milk, Egg , fish",
		user_id: "u1",
	},
	{
		id: 2,
		category: "Payments",
		title: "bills",
		body: "water,electric",
		user_id: "u1",
	},
	{
		id: 3,
		category: "Cleaning",
		title: "Wash the floor",
		body: "and clean room",
		user_id: "u2",
	},
];

const UpdateTodo = () => {
	const todoId = useParams().todoId;
	const findTodoById = DUMMY_TODOS.find((todo) => todo.id === +todoId);

	const [updateState, setUpdateState] = useState({
		title: findTodoById.title,
		category: findTodoById.category,
		body: findTodoById.body,
	});

	console.log(updateState);

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

	if (!findTodoById) {
		return (
			<div className="center">
				<h2>Could not find todo!</h2>
			</div>
		);
	}

	return (
		<form onSubmit={updateTodoSubmitHandler}>
			<div className="form-control">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					value={updateState.title}
					placeholder="title"
					onChange={inputHandler}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="category">Category</label>
				<input
					type="text"
					id="category"
					name="category"
					value={updateState.category}
					placeholder="category"
					onChange={inputHandler}
				/>
			</div>
			<div className="form-control">
				<label htmlFor="body">Body</label>
				<input
					type="text"
					id="body"
					name="body"
					value={updateState.body}
					placeholder="body"
					onChange={inputHandler}
				/>
			</div>
			<button type="submit">Update Task</button>
		</form>
	);
};

export default UpdateTodo;
