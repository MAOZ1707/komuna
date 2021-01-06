import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { TodoContext } from "../../context/TodoContext";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import Modal from "../../UiElements/Modal";
import Button from "../../FormElements/Button";
import ErrorModal from "../../UiElements/ErrorModal";
import deleteTodo from "../../assets/img/delete-todo.svg";
import { fetchTodos } from "../../hooks/util/requests";

import "./TodoItem.style.css";

const TodoItem = (props) => {
	const authContext = useContext(AuthContext);
	const todoContext = useContext(TodoContext);
	const [showModal, setShowModal] = useState(false);
	const { error, isLoading, sendRequest, clearError, setIsLoading } = useFetch();

	const { isComplete } = props;

	const showDeleteModal = () => {
		setShowModal(true);
	};
	const closeDeleteModal = () => {
		setShowModal(false);
	};

	const confirmDeleteModal = async () => {
		setShowModal(false);
		try {
			await sendRequest(`/api/todos/${props.id}`, "DELETE", null, {
				Authorization: "Bearer " + authContext.token,
			});
			const todos = await fetchTodos(props.creator);
			todoContext.setLoadedTodos(todos);
			setIsLoading(false);
		} catch (error) {}
	};

	const completeTodo = async () => {
		try {
			await sendRequest(
				`/api/todos/${props.id}`,
				"PATCH",
				{
					isComplete: !isComplete,
				},
				{ Authorization: "Bearer " + authContext.token }
			);
			const todos = await fetchTodos(props.creator);
			todoContext.setLoadedTodos(todos);
			setIsLoading(false);
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Modal
				show={showModal}
				onCancel={closeDeleteModal}
				footerClass="place-item__modal-action"
				footer={
					<React.Fragment>
						<Button link onClick={closeDeleteModal}>
							Cancel
						</Button>
						<Button edit onClick={confirmDeleteModal}>
							Conform Delete
						</Button>
					</React.Fragment>
				}
			>
				<img src={deleteTodo} alt="delete-todo " />
				<p>Do you sure you want to delete this task?</p>
			</Modal>
			<li className="todo-item">
				{isLoading && <LoadingSpinner asOverlay />}
				<span>{props.createAt}</span>
				<div className={isComplete ? "todo-item__info complete" : "todo-item__info "}>
					{props.category === "Others" ? <h3>{props.title}</h3> : <h3>{props.category}</h3>}
					<p>{props.body}</p>
				</div>

				<div className="todo-item__actions">
					{authContext.userId === props.creator && (
						<React.Fragment>
							{!isComplete && (
								<motion.button
									className="tooltip--edit"
									data-tooltip="Edit"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.3 }}
								>
									<Link to={`/todos/${props.id}`}>
										<i className="far fa-edit"></i>
									</Link>
								</motion.button>
							)}

							<motion.button
								onClick={showDeleteModal}
								className="tooltip--delete"
								data-tooltip="Delete"
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.3 }}
							>
								<i className="far fa-trash-alt"></i>
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.1 }}
								className="tooltip--active"
								data-tooltip={!isComplete ? "Check" : "Un-Check"}
								transition={{ duration: 0.3 }}
								onClick={completeTodo}
							>
								{isComplete ? (
									<i className="far fa-check-square"></i>
								) : (
									<i className="far fa-square"></i>
								)}
							</motion.button>
						</React.Fragment>
					)}
				</div>
			</li>
		</React.Fragment>
	);
};

export default TodoItem;
