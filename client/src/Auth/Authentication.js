import React, { useState, useContext } from "react";
import axios from "axios";

import Card from "../UiElements/Card";

import "../components/Todos/NewTodo.style.css";
import { AuthContext } from "../context/AuthContext";

const Authentication = () => {
	const authContext = useContext(AuthContext);

	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
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

	const handleSignUpSubmit = async (e) => {
		e.preventDefault();

		if (isSignUp) {
			setIsLoading(true);
			try {
				const response = await axios({
					method: "POST",
					url: " http://localhost:9000/api/user/login",
					data: {
						email: signUpState.email,
						password: signUpState.password,
					},
				});
				const data = await response.data;
				setIsLoading(false);
				authContext.login();
				console.log(data);
			} catch (err) {
				setIsLoading(false);
				setError("We have som problem, please try again");
			}
		} else {
			try {
				setIsLoading(true);
				const response = await axios({
					method: "POST",
					url: " http://localhost:9000/api/user/signup",
					data: {
						firstname: signUpState.firstName,
						lastname: signUpState.lastName,
						email: signUpState.email,
						password: signUpState.password,
					},
				});
				const data = await response.data;
				setIsLoading(false);
				authContext.login();
				console.log(data);
			} catch (err) {
				setIsLoading(false);
				setError("We have som problem, please try again");
			}
		}
	};

	return (
		<React.Fragment>
			{/* //TODO ------->  MAKE LOADING SPINNER HERE */}
			{isLoading && <div>Loading...</div>}
			{/* //TODO ------->  MAKE MODAL-> ERROR MESSAGE HERE */}
			{error && (
				<div style={{ color: "black", background: "red" }}>{error}</div>
			)}
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
		</React.Fragment>
	);
};

export default Authentication;
