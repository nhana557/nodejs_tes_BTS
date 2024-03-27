import mongoose from "mongoose";
import { ServerError } from "../utils/ApiError.js";

const ItemCheckSchema = new mongoose.Schema({
	checkListId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "checklist",
	},
	itemName: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	createdBy: {
		userId: mongoose.Schema.Types.ObjectId,
		name: String,
		date: Date,
		unixDate: Number,
		description: String,
	},
	updatedBy: [
		{
			userId: mongoose.Schema.Types.ObjectId,
			name: String,
			date: Date,
			unixDate: Number,
			description: String,
		},
	],
	isDeleted: {
		type: Boolean,
		default: false,
	},
	deletedBy: [
		{
			userId: mongoose.Schema.Types.ObjectId,
			name: String,
			date: Date,
			unixDate: Number,
			description: String,
		},
	],
});

// eslint-disable-next-line prefer-arrow-callback, no-unused-vars
ItemCheckSchema.post("save", function (error, doc, next) {
	if (error.code === 11000) {
		const uniqueFields = Object.keys(error.keyValue);
		const errorMessage = uniqueFields.map((field) => `${field} must be unique`).join(", ");
		throw new ServerError(errorMessage, 400);
	}
	next();
});

ItemCheckSchema.pre("countDocuments", function () {
	this.where({ isDeleted: false });
});

ItemCheckSchema.pre("find", function () {
	this.where({ isDeleted: false });
});

ItemCheckSchema.pre("findOne", function () {
	this.where({ isDeleted: false });
});

const itemCheclist = mongoose.model("itemCheclist", ItemCheckSchema);

export default itemCheclist;
