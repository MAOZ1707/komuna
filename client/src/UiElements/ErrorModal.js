import React from "react";

import Modal from "./Modal";
import errorImage from "../assets/img/error.svg";

const ErrorModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header="An Error Occurred!"
			show={!!props.error}
			footer={<button onClick={props.onClear}>Close</button>}
		>
			<img src={errorImage} alt="errorMessage" />
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
