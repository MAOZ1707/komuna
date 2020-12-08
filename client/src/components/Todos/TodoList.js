import React from "react";
import { Link } from "react-router-dom";

import Card from "../../UiElements/Card";
import TodoItem from "./TodoItem";
import "./TodoList.style.css";

const TodoList = (props) => {
	console.log(props.items);
	if (props.items.length === 0) {
		return (
			<div className="place-list center">
				<Card>
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

	return (
		<ul className="todo-list">
			{props.items.map((task) => (
				<TodoItem
					key={task._id}
					id={task._id}
					title={task.title}
					body={task.body}
					category={task.category}
				/>
			))}
		</ul>
	);
};

export default TodoList;
