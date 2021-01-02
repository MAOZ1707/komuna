import React from "react";
import "./UserItem.style.css";
import Avatar from "../../../UiElements/Avatar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../../../UiElements/Card";

const UserItem = (props) => {
	return (
		<motion.li whileHover={{ scale: 1.1 }} className="user-item">
			<Card className="user-item__content">
				<Link to={`/${props.id}/todos`}>
					<div className="user-item__image">
						<Avatar image={props.image} alt={props.firstname} />
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
		</motion.li>
	);
};

export default UserItem;
