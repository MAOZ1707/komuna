import React from "react";

import "./MainHeader.style.css";

function MainHeader(props) {
	return <header className="main-header">{props.children}</header>;
}

export default MainHeader;
