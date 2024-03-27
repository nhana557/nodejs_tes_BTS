import express from "express";
import authRoute from "./auth.routes.js";
import checkListRoute from "./checkList.routes.js";

const router = express.Router();

const defaultRoutes = [
	{
		path: "/auth",
		route: authRoute,
	},
	{
		path: "/checklist",
		route: checkListRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
