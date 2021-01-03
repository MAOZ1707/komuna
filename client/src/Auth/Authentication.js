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

	const { error, isLoading, sendRequest, clearError, setIsLoading } = useFetch();

	const onChangeHandler = (e) => {
		setSignUpState({
			...signUpState,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		setSignUpState({
			...signUpState,
			image: img,
		});
	}, [img]);

	const uploadedFile = (value) => {
		setImg(value);
	};

	const handleSignUpSubmit = async (e) => {
		e.preventDefault();

		if (isSignUp) {
			try {
				const responseData = await sendRequest(
					"/api/user/login",
					"POST",
					{
						email: signUpState.email,
						password: signUpState.password,
					},
					{
						"Content-Type": "application/json",
					}
				);

				authContext.login(responseData.user._id, responseData.token);
				setIsLoading(false);
			} catch (err) {}
		} else {
			try {
				const formData = new FormData();
				formData.append("firstname", signUpState.firstName);
				formData.append("lastname", signUpState.lastName);
				formData.append("email", signUpState.email);
				formData.append("password", signUpState.password);
				formData.append("image", img);

				const responseData = await sendRequest("/api/user/signup", "POST", formData, {
					"Content-Type": "multipart/form-data",
				});

				authContext.login(responseData.user._id, responseData.token);

				setIsLoading(false);
			} catch (err) {}
		}
	};

	const errorHandler = () => {
		clearError(null);
	};

	return (
		<React.Fragment>
			{<ErrorModal error={error} onClear={errorHandler} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<Card className={`authentication ${!isSignUp ? "signup" : "login"}`}>
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
							<Button upload type={"submit"}>
								SIGN UP
							</Button>
						</div>
					</div>
					{!isSignUp && (
						<div className="image-profile">
							<UploadImage onInput={uploadedFile} name="image" />
						</div>
					)}
				</form>
				<div className="footer-control">
					{!isSignUp && (
						<p>
							Already signed up?
							<Button link onClick={() => setIsSignUp((prevState) => !prevState)}>
								Log in
							</Button>
						</p>
					)}
					{isSignUp && (
						<Button link onClick={() => setIsSignUp((prevState) => !prevState)}>
							Back
						</Button>
					)}
				</div>
			</Card>
		</React.Fragment>
	);
};

export default Authentication;
