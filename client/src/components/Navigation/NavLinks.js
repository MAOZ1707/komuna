import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./NavLinks.style.css";

const NavLinks = () => {
	const authContext = useContext(AuthContext);
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					All USERS
				</NavLink>
			</li>
			{authContext.isLoggedIn && (
				<li>
					<NavLink to={`/${authContext.userId}/todos`}>MY TODOS</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<NavLink to="/todos/new">ADD TODOS</NavLink>
				</li>
			)}
			{!authContext.isLoggedIn && (
				<li>
					<NavLink to="/auth">NEW USER</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<button onClick={() => authContext.logout()}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
