import React, { useState } from "react";
import { motion } from "framer-motion";
import homeSvg from "../../assets/img/home-login.svg";
import "./style/home.style.css";

import { createHome } from "../../axios/axios";

const HomeLogin = () => {
	const [field, setField] = useState({
		city: "",
		street: "",
		houseNumber: "",
		zipCode: "",
	});

	console.log(field);
	const handleSubmit = (e) => {
		e.preventDefault();
		//todo -> Send post request to server
		createHome(field);

		// Rest field
		setField({
			city: "",
			street: "",
			houseNumber: "",
			zipCode: "",
		});
	};

	return (
		<div className="form-container">
			<motion.h2
				animate={{
					x: [-200, 0],
				}}
			>
				Add Your Home
			</motion.h2>
			<div className="form-elements">
				<motion.img
					animate={{
						y: [-300, 0],
					}}
					src={homeSvg}
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
					<label htmlFor="city" className="label-city">
						<span className="content-name">City</span>
					</label>
					<input
						type="text"
						name="city"
						value={field.city}
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, city: e.target.value })}
					/>
				</motion.div>
				<motion.div
					className="form-group"
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1 }}
				>
					<label htmlFor="street" className="label-street">
						<span className="content-name">Street</span>
					</label>
					<input
						type="text"
						value={field.street}
						name="street"
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, street: e.target.value })}
					/>
				</motion.div>
				<motion.div
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1.2 }}
					className="form-group"
				>
					<label htmlFor="houseNumber" className="label-house-number">
						<span className="content-name">House Number</span>
					</label>
					<input
						type="text"
						name="houseNumber"
						value={field.houseNumber}
						autoComplete="none"
						required
						onChange={(e) =>
							setField({ ...field, houseNumber: e.target.value })
						}
					/>
				</motion.div>
				<motion.div
					animate={{ x: [-300, 0] }}
					transition={{ duration: 1.5 }}
					className="form-group"
				>
					<label htmlFor="zipCode" className="label-zip-code">
						<span className="content-name">Zip Code</span>
					</label>
					<input
						type="text"
						value={field.zipCode}
						name="zipCode"
						autoComplete="none"
						required
						onChange={(e) => setField({ ...field, zipCode: e.target.value })}
					/>
				</motion.div>
				{field.city && field.street && field.houseNumber && field.zipCode ? (
					<motion.button
						whileHover={{ scale: 1.1 }}
						style={{ background: " rgb(107, 183, 255)" }}
						className="submit-btn"
					>
						<span>ADD YOUR HOME</span>
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

export default HomeLogin;
