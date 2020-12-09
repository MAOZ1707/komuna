import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
import BackDrop from "../../UiElements/BackDrop";
import "./MainNavigation.style.css";

const MainNavigation = (props) => {
	const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

	const openSideBar = () => {
		setSideBarIsOpen(true);
	};

	const closeSideBar = () => {
		setSideBarIsOpen(false);
	};

	return (
		<React.Fragment>
			{sideBarIsOpen && <BackDrop onClick={closeSideBar} />}
			<SideBar show={sideBarIsOpen} onClick={closeSideBar}>
				<nav className="main-navigation__sidebar-nav">
					<NavLinks />
				</nav>
			</SideBar>
			<MainHeader>
				<button className="main-navigation__menu-btn" onClick={openSideBar}>
					<span></span>
					<span></span>
					<span></span>
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">Home Icon</Link>
				</h1>
				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
