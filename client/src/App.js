import Login from "./components/login/Login";
import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeDataProvider from "./context/homeContext";

import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<HomeDataProvider>
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
				</Switch>
			</HomeDataProvider>
		</BrowserRouter>
	);
};

export default App;
