import React, { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";

import { motion } from "framer-motion";
import "./FilterTodo.style.css";

const FilterTodos = () => {
	const todoContext = useContext(TodoContext);

	return (
		<div className="filter-todos--container">
			<div className="filter-todo--box">
				<motion.button
					animate={{ x: [-100, 1], opacity: [0, 1] }}
					transition={{ duration: 0.5 }}
					className="filter-todos--all"
					onClick={() => todoContext.setShowTodos("All")}
				>
					All
				</motion.button>
				<motion.button
					animate={{ x: [-100, 1], opacity: [0, 1] }}
					transition={{ duration: 0.6 }}
					className="filter-todos--active"
					onClick={() => todoContext.setShowTodos("UnCompleted")}
				>
					Active
				</motion.button>
				<motion.button
					animate={{ x: [-100, 1], opacity: [0, 1] }}
					transition={{ duration: 0.7 }}
					className="filter-todos--shopping"
					onClick={() => todoContext.setShowTodos("Shopping")}
				>
					Shopping
				</motion.button>
				<motion.button
					animate={{ x: [-100, 1], opacity: [0, 1] }}
					transition={{ duration: 0.8 }}
					className="filter-todos--payments"
					onClick={() => todoContext.setShowTodos("Payments")}
				>
					Payments
				</motion.button>
				<motion.button
					animate={{ x: [-100, 1], opacity: [0, 1] }}
					transition={{ duration: 0.9 }}
					className="filter-todos--others"
					onClick={() => todoContext.setShowTodos("Others")}
				>
					Others
				</motion.button>
			</div>
		</div>
	);
};

export default FilterTodos;
