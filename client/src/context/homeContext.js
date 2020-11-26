import React, { useState, createContext, useEffect } from "react";
import { getHome } from "../axios/axios";

export const HomeContext = createContext(null);

const HomeContextProvider = ({ children }) => {
	const [homeData, setHomeData] = useState(null);

	useEffect(() => {
		const get = async () => {
			const result = await getHome();
			setHomeData(result[0]);
		};
		get();
	}, []);

	return (
		<HomeContext.Provider value={{ homeData, setHomeData }}>
			{children}
		</HomeContext.Provider>
	);
};

export default HomeContextProvider;
