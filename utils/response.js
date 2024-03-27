const headers = { Content_Type: "application/json" };

// returning data success to response, it will be impolemented on express callback
export const successResponse = (data, message = "success", statusCode = 200) => {
	const response = {
		headers,
		statusCode,
		body: { statusCode, message, data },
	};

	return response;
};
