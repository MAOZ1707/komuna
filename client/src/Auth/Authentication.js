import React, { useState } from "react";

import Card from "../UiElements/Card";

import "../components/Todos/NewTodo.style.css";

const Authentication = () => {
	const [isSignUp, setIsSignUp] = useState(true);

	const [signUpState, setSignUpState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [loginState, setLoginState] = useState({
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
		console.log(signUpState); //TODO -- SEND TO BACKEND
	};

	const onLoginChangeHandler = (e) => {
		setLoginState({
			...loginState,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginUpSubmit = (e) => {
		e.preventDefault();
		console.log(loginState); //TODO -- SEND TO BACKEND
	};

	console.log(signUpState);
	console.log(loginState);

	if (isSignUp) {
		return (
			<Card className="authentication">
				<form onSubmit={handleLoginUpSubmit}>
					<div className="form-control">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							name="email"
							value={loginState.email}
							placeholder="email"
							onChange={onLoginChangeHandler}
						/>
					</div>

					<div className="form-control">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={loginState.password}
							placeholder="password"
							onChange={onLoginChangeHandler}
						/>
					</div>

					<button style={{ background: "lightBlue", border: "none" }}>
						Log in
					</button>
				</form>
			</Card>
		);
	}

	return (
		<Card className="authentication">
			<form onSubmit={handleSignUpSubmit}>
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
				<div className="form-control">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={signUpState.confirmPassword}
						placeholder="confirm password"
						onChange={onChangeHandler}
					/>
				</div>
				<button style={{ background: "lightBlue", border: "none" }}>
					Sign Up
				</button>
			</form>
		</Card>
	);
};

export default Authentication;
