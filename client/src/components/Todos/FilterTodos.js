import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

import { motion } from "framer-motion";
import "./FilterTodo.style.css";

const FilterTodos = () => {
	const todoContext = useContext(TodoContext);

	const handlers = (category) => {
		todoContext.setShowTodos(category);
	};

	return (
		<div className="filter-todos--container">
			<div className="filter-todo--box">
				<button name="test" className="filter-todos--all" onClick={() => handlers("All")}>
					All
				</button>
				<button className="filter-todos--active" onClick={() => handlers("Active")}>
					Active
				</button>
				<button className="filter-todos--others" onClick={() => handlers("Others")}>
					Other
				</button>
				<button className="filter-todos--shopping" onClick={() => handlers("Shopping")}>
					Shopping
				</button>
				<button className="filter-todos--payments" onClick={() => handlers("Payments")}>
					Payments
				</button>
			</div>
		</div>
	);
};

export default FilterTodos;
