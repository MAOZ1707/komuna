import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TodoContext } from "../../context/TodoContext";
import Card from "../../UiElements/Card";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "../../UiElements/LoadingSpinner";
import Modal from "../../UiElements/Modal";
import Button from "../../FormElements/Button";
import "./TodoItem.style.css";
import ErrorModal from "../../UiElements/ErrorModal";
import deleteTodo from "../../assets/img/delete-todo.svg";

const TodoItem = (props) => {
	const authContext = useContext(AuthContext);
	const todoContext = useContext(TodoContext);
	const [showModal, setShowModal] = useState(false);
	const { error, isLoading, sendRequest, clearError } = useFetch();
	const [isComplete, setIsComplete] = useState(props.isComplete);

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
			todoContext.setLoadedTodos((prevState) => {
				return prevState.filter((todo) => todo._id !== props.id);
			});
		} catch (error) {
			console.log(error);
		}
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
			setIsComplete((prevState) => !prevState);
		} catch (error) {
			console.log(error);
		}
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
						<Button danger onClick={confirmDeleteModal}>
							Conform Delete
						</Button>
					</React.Fragment>
				}
			>
				<img src={deleteTodo} alt="delete-todo " />
				<p>Do you sure you want to delete this task?</p>
			</Modal>

			<li className="todo-item">
				<span>{props.createAt}</span>
				<Card className={`todo-item__content ${props.category}`}>
					{isLoading && <LoadingSpinner asOverlay />}
					{isComplete && <p className="todo-item__message">COMPLETE</p>}
					<div className={isComplete ? "todo-item__info complete" : "todo-item__info "}>
						{props.category === "Outers" ? <h3>{props.title}</h3> : null}
						<p>{props.body}</p>
					</div>

					<div className="todo-item__actions">
						{authContext.userId === props.creator && (
							<React.Fragment>
								{!isComplete && (
									<button>
										<Link to={`/todos/${props.id}`}>
											<i className="far fa-edit"></i>
										</Link>
									</button>
								)}

								<button onClick={showDeleteModal}>
									<i className="far fa-trash-alt"></i>
								</button>

								<button onClick={completeTodo}>
									{isComplete ? (
										<i className="far fa-check-square"></i>
									) : (
										<i className="far fa-square"></i>
									)}
								</button>
							</React.Fragment>
						)}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default TodoItem;
