import React from "react";
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

const App = () => {
	return (
		<Router>
			<MainNavigation />
			<main>
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
					<Route path="/auth">
						<Authentication />
					</Route>
					<Redirect to="/" />
				</Switch>
			</main>
		</Router>
	);
};

export default App;
