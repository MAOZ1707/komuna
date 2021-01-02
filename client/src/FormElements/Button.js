import React from "react";

import "./Button.style.css";

const Button = (props) => {
	return (
		<button
			className={`btn ${props.danger && "btn--danger"} ${props.link && "btn--link"} 
       ${props.form && "btn--form"}  ${props.edit && "btn--edit"}  ${props.create && "btn--create"}
		 ${props.upload && "btn--upload"} ${props.stretch && "btn--stretch"}
			`}
			onClick={props.onClick}
			type={props.type}
		>
			{props.children}
		</button>
	);
};

export default Button;
