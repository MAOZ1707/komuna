import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Card from "../../UiElements/Card";
import Modal from "../../UiElements/Modal";

import "./TodoItem.style.css";

const TodoItem = (props) => {
	const authContext = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);

	const showDeleteModal = () => {
		setShowModal(true);
	};
	const closeDeleteModal = () => {
		setShowModal(false);
	};
	const confirmDeleteModal = () => {
		console.log("task delete!!");
	};

	return (
		<React.Fragment>
			<Modal
				show={showModal}
				onCancel={closeDeleteModal}
				footerClass="place-item__modal-action"
				footer={
					<React.Fragment>
						<button onClick={closeDeleteModal}>Cancel</button>
						<button onClick={confirmDeleteModal}>Conform Delete</button>
					</React.Fragment>
				}
			>
				<p>Do you sure you want to delete this task?</p>
				{/* TODO --   ADD IMAGE! */}
			</Modal>

			<li className="todo-item">
				<Card className="todo-item__content">
					<div className="todo-item__info">
						<h2>{props.title}</h2>
						<h3>{props.category}</h3>
						<p>{props.body}</p>
					</div>
					<div className="todo-item__actions">
						{authContext.isLoggedIn && (
							<button>
								<Link to={`/todos/${props.id}`}>EDIT</Link>
							</button>
						)}
						{authContext.isLoggedIn && (
							<button onClick={showDeleteModal}>DELETE</button>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default TodoItem;
