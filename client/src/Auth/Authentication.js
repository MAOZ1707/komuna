import React, { useState, useContext, useEffect } from "react";

import Card from "../UiElements/Card";
import ErrorModal from "../UiElements/ErrorModal";
import LoadingSpinner from "../UiElements/LoadingSpinner";
import Button from "../FormElements/Button";
import { AuthContext } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import loginImage from "../assets/img/login.jpg";
import UploadImage from "./UploadImage";

import "../components/Todos/NewTodo.style.css";

const Authentication = () => {
	const authContext = useContext(AuthContext);
	const [isSignUp, setIsSignUp] = useState(false);
	const [img, setImg] = useState(null);
	const [signUpState, setSignUpState] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		image: null,
	});
	console.log(signUpState);
	console.log(img);

	const { error, isLoading, sendRequest, clearError } = useFetch();

	const onChangeHandler = (e) => {
		setSignUpState({
			...signUpState,
			image: img,
			[e.target.name]: e.target.value,
		});
	};

	const uploadedFile = (value) => {
		console.log(value);
		setImg(value);
	};

	const handleSignUpSubmit = async (e) => {
		console.log(signUpState);
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
			} catch (err) {}
		}
	};

	const errorHandler = () => {
		clearError(null);
	};

	return (
		<React.Fragment>
			{<ErrorModal error={error} onClear={errorHandler} />}
			<Card className={`authentication ${!isSignUp ? "signup" : "login"}`}>
				{isLoading && <LoadingSpinner asOverlay />}
				<form onSubmit={handleSignUpSubmit}>
					<div className="inputs-field">
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
							<Button form type={"submit"}>
								{isSignUp ? "LOG IN" : "SIGN UP"}
							</Button>
						</div>
					</div>
					{!isSignUp && (
						<div className="image-profile">
							<UploadImage onInput={uploadedFile} name="image" />
						</div>
					)}
				</form>
				{isSignUp && (
					<div className="auth-image-controller">
						<img src={loginImage} alt="authPic" />
					</div>
				)}
				<div className="footer-control">
					{!isSignUp && (
						<p>
							Already sign up?
							<Button link onClick={() => setIsSignUp((prevState) => !prevState)}>
								Log in
							</Button>
						</p>
					)}
				</div>
			</Card>
		</React.Fragment>
	);
};

export default Authentication;
