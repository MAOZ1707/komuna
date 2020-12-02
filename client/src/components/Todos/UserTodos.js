import React from "react";
import { useParams } from "react-router-dom";

import TodoList from "./TodoList";

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

const UserTodos = () => {
	const userId = useParams().userId;

	const filterTodos = DUMMY_TODOS.filter((todo) => userId === todo.user_id);

	return <TodoList items={filterTodos} />;
};

export default UserTodos;
