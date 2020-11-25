import React from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeDataProvider from "./context/homeContext";
import UserLogin from "./components/login/UsersLogin";
import "./App.css";
import HomeLogin from "./components/login/HomeLogin";
import UserContextProvider from "./context/userContext";

const App = () => {
	return (
		<BrowserRouter>
			<HomeDataProvider>
				<UserContextProvider>
					<Switch>
						<Route exact path="/">
							<Dashboard />
						</Route>
						<Route path="/home">
							<HomeLogin />
						</Route>
						<Route path="/user">
							<UserLogin />
						</Route>
					</Switch>
				</UserContextProvider>
			</HomeDataProvider>
		</BrowserRouter>
	);
};

export default App;
