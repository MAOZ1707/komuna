import React, { useState, useCallback } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import "./App.css";
import MainNavigation from "./components/Navigation/MainNavigation";
import Users from "./components/users/User";
import UserTodos from "./components/Todos/UserTodos";
import NewTodos from "./components/Todos/NewTodos";
import UpdateTodo from "./components/Todos/UpdateTodo";
import Authentication from "./Auth/Authentication";
import { AuthContext } from "./context/AuthContext";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = useCallback(() => {
		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
	}, []);

	let routes;

	if (isLoggedIn) {
		routes = (
			<Switch>
				<Route exact path="/">
					<Users />
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
				<Route exact path="/">
					<Users />
				</Route>
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

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				login: login,
				logout: logout,
			}}
		>
			<Router>
				<MainNavigation />
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
