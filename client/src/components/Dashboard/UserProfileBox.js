import React from "react";

import Card from "../../UiElements/Card";

import "./UserProfileBox.style.css";

const UserProfileBox = (props) => {
	return (
		<Card>
			<h3>
				<span>{props.firstName} </span>
				<span>{props.lastName}</span>
			</h3>
			<h3>{props.email}</h3>
			<h3 className="image">image</h3>
		</Card>
	);
};

export default UserProfileBox;
