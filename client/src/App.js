import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import Users from "./components/users/User";
import UserTodos from "./components/Todos/UserTodos";
import NewTodos from "./components/Todos/NewTodos";
import UpdateTodo from "./components/Todos/UpdateTodo";
import Authentication from "./Auth/Authentication";
import { TodoContext } from "./context/TodoContext";
import { AuthContext } from "./context/AuthContext";
import { UserContext } from "./context/UserContext";
import Dashboard from "./components/Dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";

const App = () => {
	const {
		login,
		logout,
		userId,
		token,
		showTodos,
		loadedTodos,
		setLoadedTodos,
		setShowTodos,
		users,
		setUsers,
	} = useAuth();

	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route exact path="/">
					<Users />
				</Route>
				<Route exact path="/:userId/dashboard">
					<Dashboard />
				</Route>
				<Route exact path="/:userId/todos">
					<UserTodos />
				</Route>
				<Route exact path="/todos/new">
					<NewTodos />
				</Route>
				<Route path="/todos/:todoId">
					<UpdateTodo />
				</Route>
				<Redirect to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path="/:userId/todos">
					<UserTodos />
				</Route>
				<Route path="/auth">
					<Authentication />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	const authContextValue = {
		userId: userId,
		isLoggedIn: !!token,
		token: token,
		login: login,
		logout: logout,
	};

	const todoContextValue = {
		loadedTodos,
		setLoadedTodos,
		showTodos,
		setShowTodos,
	};

	const usersContextValue = {
		users,
		setUsers,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			<UserContext.Provider value={usersContextValue}>
				<TodoContext.Provider value={todoContextValue}>
					<Router>
						<MainNavigation />
						<main>{routes}</main>
					</Router>
				</TodoContext.Provider>
			</UserContext.Provider>
		</AuthContext.Provider>
	);
};

export default App;
