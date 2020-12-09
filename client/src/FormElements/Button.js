import React from "react";

import "./Button.style.css";

const Button = (props) => {
	return (
		<button
			className={`btn ${props.danger && "btn--danger"} ${props.invert && "btn--invert"} 
      btn--${props.size || "default"} ${props.form && "btn--form"}  `}
			onClick={props.onClick}
			type={props.type}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
