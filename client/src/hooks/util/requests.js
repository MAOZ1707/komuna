export const fetchTodos = async (id) => {
	try {
		const response = await fetch(`/api/todos/user/${id}`);
		const todos = await response.json();

		return todos.todos ? todos.todos : [];
	} catch (error) {
		return [];
	}
};
