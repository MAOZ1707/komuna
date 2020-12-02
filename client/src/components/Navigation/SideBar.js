import React from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import "./SideBar.style.css";

const SideBar = (props) => {
	const content = (
		<CSSTransition
			in={props.show}
			classNames="slide-in-left"
			timeout={200}
			mountOnEnter
			unmountOnExit
		>
			<aside className="side-drawer" onClick={props.onClick}>
				{props.children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(content, document.getElementById("side-bar"));
};

export default SideBar;
