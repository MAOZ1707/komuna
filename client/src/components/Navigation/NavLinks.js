import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./NavLinks.style.css";

const NavLinks = () => {
	const authContext = useContext(AuthContext);
	const history = useHistory();

	const redirectLogout = () => {
		authContext.logout();
		history.push("/auth");
	};

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
					<NavLink to="/auth">sign up/log in</NavLink>
				</li>
			)}
			{authContext.isLoggedIn && (
				<li>
					<button onClick={redirectLogout}>LOGOUT</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
