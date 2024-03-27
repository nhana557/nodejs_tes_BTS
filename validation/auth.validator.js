import { hashing, matchPassword } from "../utils/bcrypt.js";
import { validateType } from "../utils/validator.js";
import { StatusCodes } from "http-status-codes";
import { ServerError } from "../utils/ApiError.js";

import makeUserDb from "../repository/user_repository.js";

const userAccess = makeUserDb();

export const registerValidator = ({ username, password, confirmPassword, fullname }) => {
	if (!username || !validateType(username, "string"))
		throw new ServerError("username diperlukan dan harus berupa teks", StatusCodes.BAD_REQUEST);

	if (!password || !validateType(password, "string"))
		throw new ServerError("password diperlukan dan harus berupa teks", StatusCodes.BAD_REQUEST);

	if (!fullname || !validateType(fullname, "string"))
		throw new ServerError("fullname diperlukan dan harus berupa teks", StatusCodes.BAD_REQUEST);

	return {
		getUsername: () => username,
		getPassword: async () => await hashing({ password }),
		getFullname: () => fullname,
	};
};
// TODO : Fix this custom mapping

export const loginValidator = async ({ username, password }) => {
	// check username, it's required
	if (!username || username === undefined || username === "") {
		throw new ServerError("username diperlukan.", StatusCodes.BAD_REQUEST);
	}

	// check username, it must be string type
	if (!validateType(username, "string")) {
		throw new ServerError("username harus berupa tipe teks.", StatusCodes.BAD_REQUEST);
	}

	// required, string, min 8 characters, includes 1 capital letter & 1 symbol

	if (!password || password === undefined || password === "") {
		throw new ServerError("Password diperlukan.", StatusCodes.BAD_REQUEST);
	}

	const userFound = await userAccess.findByUsername({ username });
	if (!userFound.isActive) {
		throw new ServerError("user has been blocked", 401);
	}

	await matchPassword({ password, hashPassword: userFound.passwordHash });

	const filteredUserData = {
		id: userFound.id,
		fullname: userFound.fullname,
		username: userFound.username,
	};

	return {
		getUser: () => filteredUserData,
	};
};
