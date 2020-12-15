import React from "react";
import "./UserItem.style.css";
import Avatar from "../../../UiElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../UiElements/Card";

const UserItem = (props) => {
	return (
		<li className="user-item">
			<Card className="user-item__content">
				{/* <Link to={`/${props.id}/todos`}> */}
				<Link to={`/${props.id}/dashboard`}>
					<div className="user-item__image">
						<Avatar image={props.image} alt={props.firstname} />
					</div>
					<div className="user-item__info">
						<h2>{props.firstName}</h2>
						<h2>{props.lastName}</h2>
						<h4>{props.email}</h4>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserItem;
