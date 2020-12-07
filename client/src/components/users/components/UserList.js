import React from "react";

import UserItem from "./UserItem";
import Card from "../../../UiElements/Card";

import "./UserList.style.css";

const UserList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="center">
				<Card>
					<h2>No users found.</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="users-list">
			{props.items.map((user) => (
				<UserItem
					key={user._id}
					id={user._id}
					image={user.image}
					firstName={user.firstname}
					lastName={user.lastname}
					email={user.email}
				/>
			))}
		</ul>
	);
};

export default UserList;
