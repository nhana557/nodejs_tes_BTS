import { decodedToken, tokenGenerator } from "../utils/jwt.js";

export const generateToken = (data, secret) => {
	const payload = {
		...data,
	};

	return tokenGenerator({ payload, secret, expiresIn: "1h" });
};

export const verifyToken = async (token, secret) => {
	const payload = await decodedToken({
		token,
		secret,
	});

	return payload;
};
