import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.style.css";

import Backdrop from "./BackDrop";

const ModalLayout = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
				<div className={`modal__content ${props.contentClass}`}>{props.children}</div>
				<footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById("modal-popup"));
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
				<ModalLayout {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
