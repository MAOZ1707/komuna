import React, { useState, useContext } from "react";

import Card from "../UiElements/Card";

import "../components/Todos/NewTodo.style.css";
import { AuthContext } from "../context/AuthContext";

const Authentication = () => {
	const authContext = useContext(AuthContext);

	const [isSignUp, setIsSignUp] = useState(false);

	const [signUpState, setSignUpState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const onChangeHandler = (e) => {
		setSignUpState({
			...signUpState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignUpSubmit = (e) => {
		e.preventDefault();

		if (isSignUp) {
			setSignUpState({
				...signUpState,
				firstName: undefined,
				lastName: undefined,
			});
		} else {
			setSignUpState(signUpState);
		}

		authContext.login();
	};
	console.log(signUpState);

	return (
		<Card className="authentication">
			<form onSubmit={handleSignUpSubmit}>
				{!isSignUp && (
					<React.Fragment>
						<div className="form-control">
							<label htmlFor="firstname">First Name</label>
							<input
								type="text"
								id="firstname"
								name="firstName"
								value={signUpState.firstName}
								placeholder="first name"
								onChange={onChangeHandler}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="lastname">Last Name</label>
							<input
								type="text"
								id="lastname"
								name="lastName"
								value={signUpState.lastName}
								placeholder="last name"
								onChange={onChangeHandler}
							/>
						</div>
					</React.Fragment>
				)}

				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						value={signUpState.email}
						placeholder="email"
						onChange={onChangeHandler}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={signUpState.password}
						placeholder="password"
						onChange={onChangeHandler}
					/>
				</div>
				<div>
					<button style={{ background: "lightBlue", border: "none" }}>
						{isSignUp ? "LOG IN" : "SIGN UP"}
					</button>
				</div>
			</form>
			<div>
				{!isSignUp && (
					<p>
						Already sign up?
						<button
							style={{ background: "lightBlue", border: "none" }}
							onClick={() => setIsSignUp((prevState) => !prevState)}
						>
							Log in
						</button>
					</p>
				)}
			</div>
		</Card>
	);
};

export default Authentication;
