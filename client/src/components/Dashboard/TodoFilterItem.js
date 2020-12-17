import React from "react";

import Card from "../../UiElements/Card";
import "./TodoFilterItem.style.css";

const TodoFilterItem = (props) => {
	console.log(props);

	return (
		<Card className="todo-filter-item">
			<h3 className="todo-filter-item__title">{props.category}</h3>
			{props.filterTodo.map((todo) => (
				<div className={`todo-filter-item__body ${todo.isComplete && "finish"}`} key={todo._id}>
					<span className={`todo-title ${todo.isComplete && "todo-title-complete"}`}>
						{todo.title}
					</span>
					{todo.isComplete ? (
						<span className="todo-complete">Complete</span>
					) : (
						<span className="todo-active">Active</span>
					)}
				</div>
			))}
		</Card>
	);
};

export default TodoFilterItem;
