export const fetchTodos = async (id) => {
	try {
		const response = await fetch(`/api/todos/user/${id}`);
		const todos = await response.json();

		return todos.todos ? todos.todos : [];
	} catch (error) {
		return [];
	}
};

export const fetchUsers = async () => {
	try {
		const responseData = await fetch("/api/user");
		const users = await responseData.json();
		console.log(users);
		return users;
	} catch (error) {
		console.log(error);
	}
};
