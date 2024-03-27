function customDate(dateString) {
	const customDate = new Date(dateString);
	const unixDate = customDate.getTime() / 1000;
	return { customDate, unixDate };
}

export default {
	customDate,
};
