import React, { useContext, useState } from "react";
import Axios from "axios";
import "./UserItem.style.css";
import Avatar from "../../../UiElements/Avatar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import deleteTodo from "../../../assets/img/delete-todo.svg";
import Card from "../../../UiElements/Card";
import { AuthContext } from "../../../context/AuthContext";
import Modal from "../../../UiElements/Modal";
import Button from "../../../FormElements/Button";

const UserItem = (props) => {
	const [showModal, setShowModal] = useState(false);
	const { userId, logout } = useContext(AuthContext);

	const showDeleteModal = () => {
		setShowModal(true);
	};
	const closeDeleteModal = () => {
		setShowModal(false);
	};
	const deleteUserAndTodos = async () => {
		const deleteTodos = `/api/todos/user/${props.id}`;
		try {
			await Axios.delete(deleteTodos);
			logout();
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<Modal
				show={showModal}
				onCancel={closeDeleteModal}
				footerClass="place-item__modal-action"
				footer={
					<React.Fragment>
						<Button link onClick={closeDeleteModal}>
							Cancel
						</Button>
						<Button edit onClick={deleteUserAndTodos}>
							Conform Delete
						</Button>
					</React.Fragment>
				}
			>
				<img src={deleteTodo} alt="delete-todo " />
				<p>Do you sure you want to delete this user?</p>
			</Modal>

			<motion.li
				whileHover={{ scale: 1.1, transition: { ease: "easeInOut", duration: 0.5 } }}
				className="user-item"
			>
				<Card className="user-item__content">
					{userId === props.id ? (
						<button className="delete-user" onClick={showDeleteModal}>
							<motion.i
								whileHover={{ rotate: 180, transition: { ease: "easeInOut", duration: 0.5 } }}
								className="fas fa-times"
							></motion.i>
						</button>
					) : null}
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
		</React.Fragment>
	);
};

export default UserItem;
