import { JWT_TOKEN_SECRET } from "../config/env.config.js";
import { decodedToken } from "../utils/jwt.js";
import { ServerError } from "../utils/ApiError.js";
import makeUserDb from "../repository/user_repository.js";

import { StatusCodes } from "http-status-codes";

const userAccess = makeUserDb();

/**
 * Middleware to protect routes by verifying the validity of an access token.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next function.
 * @throws {ServerError} - If the token is missing, invalid, expired, or unauthorized.
 */
export const protect = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		// get the token data
		if (!authorization || !authorization.startsWith("Bearer"))
			throw new ServerError("Unauthorized, Missing or invalid token", StatusCodes.UNAUTHORIZED);

		const token = authorization.split(" ")[1];
		const decoded = decodedToken({
			token,
			secret: JWT_TOKEN_SECRET,
		});

		console.log(decoded);
		if (!decoded) throw new ServerError("Unauthorized, Session Anda telah berakhir", 401);

		const user = await userAccess.findById({ id: decoded.userId });
		if (!user.isActive) throw new ServerError("Unauthorized, User has been blocked", 401);

		user.passwordHash = undefined;
		req.user = user || {};

		next();
	} catch (err) {
		console.log(err);
		return res
			.status(
				err.statusCode || err.message === "jwt expired"
					? 401
					: err.message === "jwt must be provided"
					? 401
					: 500
			)
			.send({
				statusMessage: err.statusCode > 399 || err.statusCode === undefined ? "failed" : "success",
				statusCode:
					err.statusCode || err.message === "jwt expired"
						? 401
						: err.message === "jwt must be provided"
						? 401
						: 500,
				message: err.message === "jwt expired" ? "Unauthorized: Token expired or invalid" : err.message,
			});
	}
};
