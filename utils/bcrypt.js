import bcrypt from "bcrypt";

export async function hashing({ password, hash = 10 }) {
	return bcrypt.hash(password, hash);
}

export async function matchPassword({ password, hashPassword }) {
	const isMatch = await bcrypt.compare(password, hashPassword);

	if (!isMatch) {
		throw new UserError("Password tidak sesuai", 400);
	}

	return isMatch;
}
