import React from "react";
import TodoFilterItem from "./TodoFilterItem";

import "./TodoFilterList.style.css";

const TodoFilterList = (props) => {
	const categories = ["shopping", "payments", "others"];

	const renderByCategory = categories.map((el) => {
		const filterTodo = props.userTodos.filter(
			(todo) => todo.category.toLowerCase() === el.toLowerCase()
		);

		return (
			<React.Fragment key={el}>
				<TodoFilterItem filterTodo={filterTodo} category={el} />
			</React.Fragment>
		);
	});

	return <div className="todo-filter-container">{renderByCategory}</div>;
};

export default TodoFilterList;
