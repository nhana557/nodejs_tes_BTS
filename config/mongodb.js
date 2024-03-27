import mongoose from "mongoose";
import { MONGOURL } from "./env.config.js";

async function initDb() {
	await mongoose.connect(MONGOURL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
}

export default initDb;
