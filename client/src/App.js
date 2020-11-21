import Login from "./components/login/Login";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { useState } from "react";
import "./App.css";

const App = () => {
	const [isLogin, setIsLogin] = useState(false);

	// make useEffect instead
	if (!isLogin) {
		return <Login />;
	} else
		return (
			<BrowserRouter>
				<Route exact path="/">
					<Dashboard />
				</Route>
			</BrowserRouter>
		);
};

export default App;
