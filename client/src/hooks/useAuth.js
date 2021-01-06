import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [users, setUsers] = useState(null);
	const [loadedTodos, setLoadedTodos] = useState([]);
	const [showTodos, setShowTodos] = useState("All");

	const login = useCallback((uID, token) => {
		setToken(token);
		setUserId(uID);

		localStorage.setItem("userData", JSON.stringify({ userId: uID, token: token }));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const storageData = JSON.parse(localStorage.getItem("userData"));
		if (storageData && storageData.token) {
			login(storageData.userId, storageData.token);
		}
	}, [login]);

	return {
		login,
		logout,
		userId,
		token,
		showTodos,
		loadedTodos,
		setLoadedTodos,
		setShowTodos,
		setUsers,
		users,
	};
};
