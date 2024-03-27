import errorMiddleware from "./middlewares/error.middleware.js";
import router from "./routes/index.js";
import initDb from "./config/mongodb.js";

import { PORT } from "./config/env.config.js";
import express from "express";

const app = express();
initDb();
app.use(express.json());

app.use("/api/v1/", router);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

app.listen(PORT, async () => {
	console.log(`Listening to port ${PORT}`);
});
