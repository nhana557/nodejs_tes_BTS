import express from "express";
import { add, list, remove } from "../controllers/checklist_controller.js";
import {
	addItem,
	detailItem,
	listItem,
	removeItem,
	updateIsActive,
	updateItem,
} from "../controllers/checklItem_controller.js";
import makeCallback from "../utils/handleCb.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
	.post("/", protect, makeCallback(add))
	.post("/:id/item", protect, makeCallback(addItem))
	.get("/", protect, makeCallback(list))
	.delete("/:id", makeCallback(remove))

	// item list
	.get("/:id/item", protect, makeCallback(listItem))
	.get("/:id/item/:idItem", protect, makeCallback(detailItem))
	.delete("/:id/item/:idItem", protect, makeCallback(removeItem))
	.patch("/:id/item/:idItem", protect, makeCallback(updateIsActive))
	.put("/:id/item/:idItem", protect, makeCallback(updateItem));

export default router;
