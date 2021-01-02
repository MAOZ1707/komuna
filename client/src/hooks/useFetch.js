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
			const data = response.data;
			return data;
		} catch (err) {
			setError(err.response.data.message);
			setIsLoading(false);
			throw err;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	return { error, isLoading, sendRequest, clearError, setIsLoading };
};
