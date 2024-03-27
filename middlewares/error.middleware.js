function notFound(req, res) {
	if (req.accepts("html") || req.accepts("json")) {
		return res.status(404).json({ message: `Not found - ${req.originalUrl}` });
	}
	return res.status(404).json({ message: `Not found - ${req.originalUrl}` });
}

function errorHandler(err, req, res) {
	const { statusCode } = res;
	res.status(statusCode).json({ message: err });
}

export default { notFound, errorHandler };
