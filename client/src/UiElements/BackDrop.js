import React from "react";
import ReactDOM from "react-dom";

import "./BackDrop.style.css";

const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick}></div>,
		document.getElementById("backdrop-layout")
	);
};

export default Backdrop;
