import React from "react";
import { HomeContext } from "../../context/homeContext";

const Dashboard = () => {
	const context = React.useContext(HomeContext);

	console.log(context);

	return (
		<div>
			<h2>hello</h2>
		</div>
	);
};

export default Dashboard;
