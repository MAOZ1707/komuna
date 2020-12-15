import React, { useState, useContext } from "react";

import Card from "../UiElements/Card";
import ErrorModal from "../UiElements/ErrorModal";
import LoadingSpinner from "../UiElements/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import "../components/Todos/NewTodo.style.css";

const Authentication = () => {
	const authContext = useContext(AuthContext);
	const [isSignUp, setIsSignUp] = useState(false);

	const [signUpState, setSignUpState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const { error, isLoading, sendRequest, clearError } = useFetch();

	const onChangeHandler = (e) => {
		setSignUpState({
			...signUpState,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignUpSubmit = async (e) => {
		e.preventDefault();

		if (isSignUp) {
			try {
				const responseData = await sendRequest(
					" http://localhost:9000/api/user/login",
					"POST",
					{
						email: signUpState.email,
						password: signUpState.password,
					},
					{
						"Content-Type": "application/json",
					}
				);

				authContext.login(responseData.user._id);
			} catch (err) {}
		} else {
			try {
				const responseData = await sendRequest(
					" http://localhost:9000/api/user/signup",
					"POST",
					{
						firstname: signUpState.firstName,
						lastname: signUpState.lastName,
						email: signUpState.email,
						password: signUpState.password,
					},
					{
						"Content-Type": "application/json",
					}
				);
				console.log(responseData);
				authContext.login(responseData.user._id);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const errorHandler = () => {
		clearError(null);
	};

	return (
		<React.Fragment>
			{<ErrorModal error={error} onClear={errorHandler} />}
			<Card className="authentication ">
				{isLoading && <LoadingSpinner asOverlay />}
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
									onChange={onChangeHandler}
								/>
							</div>
						</React.Fragment>
					)}
					<div className="form-control">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={signUpState.email}
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
							onChange={onChangeHandler}
						/>
					</div>
					<div>
						{/* //TODO ----- FIX TO DISABLE AND NOT TO LOG IN SIGN UP */}
						<button style={{ background: "lightBlue", border: "none" }}>
							{isSignUp ? "LOG IN" : "SIGN UP"}
						</button>
					</div>
				</form>
				<div className="footer-control">
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
