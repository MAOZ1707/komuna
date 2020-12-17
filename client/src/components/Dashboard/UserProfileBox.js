import React from "react";

import Card from "../../UiElements/Card";

import "./UserProfileBox.style.css";

const UserProfileBox = (props) => {
	return (
		<Card className="user-profile">
			<div className="user-info">
				<h3>
					<span>{props.firstName} </span>
					<span>{props.lastName}</span>
				</h3>
				<h3>{props.email}</h3>
				<h4>todos: {props.todosNumber}</h4>
			</div>
			<h3 className="image">image</h3>
		</Card>
	);
};

export default UserProfileBox;
