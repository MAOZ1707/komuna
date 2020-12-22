import React from "react";
import "./UserItem.style.css";
import Avatar from "../../../UiElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../UiElements/Card";

const UserItem = (props) => {
	console.log(props.id);

	return (
		<li className="user-item">
			<Card className="user-item__content">
				<Link to={`/${props.id}/todos`}>
					{/* <Link to={`/${props.id}/dashboard`}> */}
					<div className="user-item__image">
						<Avatar image={`http://localhost:9000/${props.image}`} alt={props.firstname} />
					</div>
					<div className="user-item__info">
						<h2>
							<span>{props.firstName}</span>
							<span>{props.lastName}</span>
						</h2>
						<h5>{props.email}</h5>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserItem;
