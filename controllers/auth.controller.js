import endpointService from "../service/endpoint.service.js";
import { loginValidator, registerValidator } from "../validation/auth.validator.js";
import makeUserDb from "../repository/user_repository.js";
import { JWT_TOKEN_SECRET } from "../config/env.config.js";

import { successResponse } from "../utils/response.js";
import { generateToken } from "../service/token.service.js";

const userAccess = makeUserDb();
const register = async (req) => {
	const { body, originalUrl } = req;

	const validatedData = await registerValidator(body);

	const newData = {
		fullname: validatedData.getFullname(),
		username: validatedData.getUsername(),
		passwordHash: await validatedData.getPassword(),
	};

	const insertedData = await endpointService.insertDoc({
		dbAccess: userAccess,
		newData,
		originalUrl,
	});
	return successResponse();
};

const login = async (req) => {
	const { body } = req;

	const validatedData = await loginValidator(body);

	// generating access token & refresh token on app
	const token = await generateToken(
		{
			userId: validatedData.getUser().id,
		},
		JWT_TOKEN_SECRET
	);

	// Creating and returning a success response
	return successResponse({
		token,
		data: validatedData.getUser(),
	});
};

export default {
	register,
	login,
};
