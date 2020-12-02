import React, { useCallback, useState } from "react";

import "./NewTodo.style.css";

const NewTodos = () => {
	const [formState, setFormState] = useState({
		title: "",
		category: "",
		body: "",
	});

	const inputHandler = useCallback(
		(e) => {
			setFormState({
				...formState,
				[e.target.name]: e.target.value,
			});
		},
		[formState]
	);

	const creatTodoSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState); // TODO -- SAVE TO DATABASE
	};

	return (
		<form className="place-form" onSubmit={creatTodoSubmitHandler}>
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
	);
};

export default NewTodos;
