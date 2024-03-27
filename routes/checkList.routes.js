import express from "express";
import { add, list, remove } from "../controllers/checklist_controller.js";
import { addItem, listItem } from "../controllers/checklItem_controller.js";
import makeCallback from "../utils/handleCb.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
	.post("/", protect, makeCallback(add))
	.post("/:id/item", protect, makeCallback(addItem))
	.get("/", protect, makeCallback(list))
	.get("/:id/item", protect, makeCallback(listItem))
	.delete("/:id", makeCallback(remove));

export default router;
