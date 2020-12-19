import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Card from "../../UiElements/Card";
import FilterTodos from "./FilterTodos";
import TodoItem from "./TodoItem";
import "./TodoList.style.css";
import { TodoContext } from "../../context/TodoContext";

const TodoList = (props) => {
	const { showTodos } = useContext(TodoContext);

	if (props.items.length === 0) {
		return (
			<div>
				<Card className="todos-list--empty">
					<h2>No tasks found, You want to create one? </h2>
					<button>
						<Link to="/todos/new">Create Task</Link>
					</button>
					<button>
						<Link to="/">Back to users</Link>
					</button>
				</Card>
			</div>
		);
	}

	let todos;

	switch (showTodos) {
		case "All":
			todos = props.items;
			break;
		case "UnCompleted":
			todos = props.items.filter((todo) => todo.isComplete === false);
			break;
		case "Payments":
			todos = props.items.filter((todo) => todo.category === "Payments");
			break;
		case "Shopping":
			todos = props.items.filter((todo) => todo.category === "Shopping");
			break;
		case "Outers":
			todos = props.items.filter((todo) => todo.category === "Outers");
			break;

		default:
			break;
	}

	return (
		<React.Fragment>
			<FilterTodos />
			<ul className="todo-list">
				{todos.map((task) => (
					<TodoItem
						key={task._id}
						id={task._id}
						title={task.title}
						body={task.body}
						category={task.category}
						isComplete={task.isComplete}
						createAt={task.createAt}
					/>
				))}
			</ul>
		</React.Fragment>
	);
};

export default TodoList;
