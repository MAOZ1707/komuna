import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.style.css";

const NavLinks = () => {
	return (
		<ul className="nav-links">
			<li>
				<NavLink to="/" exact>
					All USERS
				</NavLink>
			</li>
			<li>
				<NavLink to="/u1/todos">MY TODOS</NavLink>
			</li>
			<li>
				<NavLink to="/todos/new">ADD TODOS</NavLink>
			</li>
			<li>
				<NavLink to="/auth">AUTH</NavLink>
			</li>
		</ul>
	);
};

export default NavLinks;
