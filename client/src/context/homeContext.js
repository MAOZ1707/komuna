import React, { useState, createContext } from "react";
import axios from "axios";

export const HomeContext = createContext(null);

// const homeDataFetch = async () => {};

const dummyData = [{ name: "maoz" }, { name: "kai" }, { name: "rotem" }];

const HomeContextProvider = ({ children }) => {
	const [homeData, setHomeData] = useState(dummyData);

	return (
		<HomeContext.Provider value={homeData}>{children}</HomeContext.Provider>
	);
};

export default HomeContextProvider;
