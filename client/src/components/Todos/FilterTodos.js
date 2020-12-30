import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

import "./FilterTodo.style.css";

const FilterTodos = () => {
	const todoContext = useContext(TodoContext);

	return (
		<div className="filter-todos--container">
			<button className="filter-todos--all" onClick={() => todoContext.setShowTodos("All")}>
				All
			</button>
			<button
				className="filter-todos--active"
				onClick={() => todoContext.setShowTodos("UnCompleted")}
			>
				Active
			</button>
			<button
				className="filter-todos--shopping"
				onClick={() => todoContext.setShowTodos("Shopping")}
			>
				Shopping
			</button>
			<button
				className="filter-todos--payments"
				onClick={() => todoContext.setShowTodos("Payments")}
			>
				Payments
			</button>
			<button className="filter-todos--others" onClick={() => todoContext.setShowTodos("Others")}>
				Others
			</button>
		</div>
	);
};

export default FilterTodos;
