export default function makeCallback(controller) {
	return async (req, res) => {
		try {
			const httpRequest = {
				host: req.hostname,
				protocol: req.protocol,
				body: req.body || {},
				query: req.query || {},
				params: req.params || {},
				ip: req.ip,
				fileImage: req.file,
				filesImage: req.files,
				method: req.method,
				path: req.path,
				originalUrl: req.originalUrl,
				user: req.user || {},
				role: req.role || {},
				outlet: req.outlet || {},
				subscription: req.subscription || {},
				headers: {
					"Content-Type": req.get("Content-Type"),
					Referer: req.get("referer"),
					"User-Agent": req.get("User-Agent"),
				},
			};

			const httpResponse = await controller(httpRequest);

			if (httpResponse.headers) {
				res.set(httpResponse.headers);
			}

			res.type("json");
			return res.status(httpResponse.statusCode).send(httpResponse.body);
		} catch (err) {
			console.log(err);
			return res
				.status(err.statusCode ? err.statusCode : err.message === "jwt expired" ? 401 : 500)
				.send({
					statusCode: err.statusCode,
					statusMessage: err.statusCode > 399 || err.statusCode === undefined ? "failed" : "success",
					message:
						err.message === "jwt expired" ? "Unauthorized: Token expired or invalid" : err.message,
				});
		}
	};
}
