import React, { useState } from "react";
// import "./style/login.style.css";
import HomeLogin from "./HomeLogin";
import UserLogin from "./UsersLogin";

const Login = () => {
	const [isHomeLogin, setIsHomeLogin] = useState(true);
	//todo --> make router in submit btn from home to user
	return <>{isHomeLogin ? <HomeLogin /> : <UserLogin />}</>;
};

export default Login;
