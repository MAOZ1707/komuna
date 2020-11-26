import React, { useState } from "react";
import { motion } from "framer-motion";
import partnersSvg from "../../assets/img/partners-img.svg";
import { createUser } from "../../axios/axios";
import "./style/home.style.css";
import { UsersContext } from "../../context/userContext";
// import { homeContext } from "../../context/userContext";
import { Redirect } from "react-router-dom";

const UsersLogin = () => {
	const { user, setUser } = React.useContext(UsersContext);

	const [field, setField] = useState({
		firstName: "",
		lastName: "",
		age: "",
		gender: "",
	});

	console.log(user);

	const handleSubmit = (e) => {
		e.preventDefault();

		createUser(field);
		setUser(field);
		// Rest field
		setField({
			firstName: "",
			lastName: "",
			age: "",
			gender: "",
		});
	};

	// if (user ?? user.length) return <Redirect to="/" />;

	return (
		<div className="form-container">
			<motion.h2
				className="form-title"
				animate={{
					x: [-200, 0],
				}}
			>
				Add Your Partners
			</motion.h2>
			<div className="form-elements">
				<motion.img
					animate={{
						x: [700, 0],
						duration: 2,
					}}
					src={partnersSvg}
					alt="home"
					width="380px"
					height="370px"
					className="home-img"
				/>
			</div>

			<motion.form
				animate={{ y: [600, 0], duration: [1, 2] }}
				className="form"
				onSubmit={handleSubmit}
			>
				<motion.div className="form-group" animate={{ x: [-300, 0] }}>
					<label htmlFor="firstName" className="label-address">
						<span className="content-name">First Name</span>
					</label>
					<input
						type="text"
						name="firstName"
						value={field.firstName}
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, firstName: e.target.value })}
					/>
				</motion.div>
				<motion.div
					className="form-group"
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1 }}
				>
					<label htmlFor="lastName" className="label-address">
						<span className="content-name">Last Name</span>
					</label>
					<input
						type="text"
						value={field.lastName}
						name="lastName"
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, lastName: e.target.value })}
					/>
				</motion.div>
				<motion.div
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1.2 }}
					className="form-group"
				>
					<label htmlFor="age" className="label-address">
						<span className="content-name">Age</span>
					</label>
					<input
						type="text"
						name="age"
						value={field.age}
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, age: e.target.value })}
					/>
				</motion.div>

				<motion.div
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1.5 }}
					className="gender-field"
				>
					<div className="gender_title">
						<span className="content-name">Gender</span>
					</div>
					<motion.label whileTap={{ scale: 1.2 }} className="radio">
						<input
							type="radio"
							value="Male"
							id="radio"
							className="radio_input"
							name="gender"
							checked={field.gender === "Male"}
							required
							onChange={(e) => setField({ ...field, gender: e.target.value })}
						/>
						<div className="radio_radio"></div>
						Male
					</motion.label>
					<motion.label whileTap={{ scale: 1.2 }} className="radio">
						<input
							type="radio"
							value="Female"
							id="radio"
							className="radio_input"
							name="gender"
							checked={field.gender === "Female"}
							required
							onChange={(e) => setField({ ...field, gender: e.target.value })}
						/>
						<div className="radio_radio"></div>
						Female
					</motion.label>
				</motion.div>
				<div className="buttons-wrapper">
					{field.firstName && field.lastName && field.age && field.gender ? (
						<motion.button
							whileHover={{ scale: 1.1 }}
							style={{ background: "#ffff6b" }}
							className="submit-btn"
						>
							<span>ADD PARTNER</span>
						</motion.button>
					) : (
						<motion.button
							disabled
							className="submit-btn"
							style={{ display: "none" }}
						></motion.button>
					)}
				</div>
			</motion.form>
		</div>
	);
};

export default UsersLogin;
