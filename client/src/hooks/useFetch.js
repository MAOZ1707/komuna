import { useState, useCallback } from "react";
import axios from "axios";

export const useFetch = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
		setIsLoading(true);
		try {
			const response = await axios({
				url,
				method,
				data: body,
				headers,
			});

			const data = await response.data;
			console.log(data);
			if (response.status >= 300) {
				console.log("status code >= 300");
				throw new Error(data.message);
			}

			setIsLoading(false);
			return data;
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
			throw error;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	return { error, isLoading, sendRequest, clearError };
};
