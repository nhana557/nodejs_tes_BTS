import express from "express";
import authController from "../controllers/auth.controller.js";
import makeCallback from "../utils/handleCb.js";
// import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router
	.post("/register", makeCallback(authController.register))
	.post("/login", makeCallback(authController.login));
// .post("/refresh-token", makeCallback(authController.refreshTokens));

export default router;
