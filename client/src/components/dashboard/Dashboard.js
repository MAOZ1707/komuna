import React from "react";
import { Redirect } from "react-router-dom";
import { HomeContext } from "../../context/homeContext";
import { motion } from "framer-motion";

const Dashboard = () => {
	const context = React.useContext(HomeContext);

	if (!context[0]) {
		return <h1>Loading</h1>;
	}

	if (!context[0].isHomeAdded) return <Redirect to="home" />;
	return (
		<motion.div
			initial={{ x: "1300px" }}
			animate={{ x: 0 }}
			whileHover={{
				scale: 1.2,
				transition: { duration: 0.2 },
			}}
		>
			<h2>Dashboard</h2>
		</motion.div>
	);
};

export default Dashboard;
