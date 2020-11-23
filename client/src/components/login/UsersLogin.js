import React, { useState } from "react";
import { motion } from "framer-motion";
import partnersSvg from "../../assets/img/partners-img.svg";
import { createUser } from "../../axios/axios";

import "./style/user.style.css";

const UsersLogin = () => {
	const [field, setField] = useState({
		firstName: "",
		lastName: "",
		age: "",
		nickName: "",
		isLoading: false,
	});

	// console.log(field);
	const handleSubmit = (e) => {
		e.preventDefault();
		//todo -> Send post request to server
		createUser({ ...field, isLoading: !field.isLoading });

		// Rest field
		setField({
			firstName: "",
			lastName: "",
			age: "",
			nickName: "",
			isLoading: false,
		});
	};

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
						y: [-300, 0],
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
					className="form-group"
				>
					<label htmlFor="nickName" className="label-address">
						<span className="content-name">Nickname</span>
					</label>
					<input
						type="text"
						value={field.nickName}
						name="nickName"
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, nickName: e.target.value })}
					/>
				</motion.div>
				{field.firstName && field.lastName && field.age && field.nickName ? (
					<motion.button
						whileHover={{ scale: 1.1 }}
						style={{ background: " rgb(107, 183, 255)" }}
						className="submit-btn"
					>
						<span>Add your home</span>
					</motion.button>
				) : (
					<motion.button
						disabled
						className="submit-btn"
						style={{ background: "#489dec" }}
					></motion.button>
				)}
			</motion.form>
		</div>
	);
};

export default UsersLogin;
