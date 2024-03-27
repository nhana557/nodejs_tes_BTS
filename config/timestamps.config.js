import date from "../utils/date.js";

export const timestamps = ({ user, description = "" }) => {
	const { customDate, unixDate } = date.customDate(Date.now());

	return {
		userId: user._id,
		name: user.username,
		date: customDate,
		unixDate: unixDate,
		description,
	};
};
