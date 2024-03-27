import jwt from "jsonwebtoken";

export const decodedToken = ({ token, secret }) => {
	return jwt.verify(token, secret);
};

export const tokenGenerator = ({ payload, secret, expiresIn }) => {
	return jwt.sign(payload, secret, { expiresIn });
};
