import React from "react";
import { Redirect } from "react-router-dom";
import { HomeContext } from "../../context/homeContext";
import { UsersContext } from "../../context/userContext";
import { motion } from "framer-motion";

const Dashboard = () => {
	const homeContext = React.useContext(HomeContext);
	const userContext = React.useContext(UsersContext);

	if (!userContext.length || !homeContext.length)
		return <Redirect to="/home" />;

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
