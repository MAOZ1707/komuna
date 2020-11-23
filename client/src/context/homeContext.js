import React, { useState, createContext, useEffect } from "react";
import { getHome } from "../axios/axios";

export const HomeContext = createContext(null);

const HomeContextProvider = ({ children }) => {
	const [homeData, setHomeData] = useState([]);

	useEffect(() => {
		const get = async () => {
			const result = await getHome();
			setHomeData(result);
		};
		get();
	}, [setHomeData]);

	return (
		<HomeContext.Provider value={homeData}>{children}</HomeContext.Provider>
	);
};

export default HomeContextProvider;
