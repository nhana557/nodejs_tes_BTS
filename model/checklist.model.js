import mongoose from "mongoose";
import { ServerError } from "../utils/ApiError.js";

const CheckListSchema = new mongoose.Schema({
	name: {
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
CheckListSchema.post("save", function (error, doc, next) {
	if (error.code === 11000) {
		const uniqueFields = Object.keys(error.keyValue);
		const errorMessage = uniqueFields.map((field) => `${field} must be unique`).join(", ");
		throw new ServerError(errorMessage, 400);
	}
	next();
});

CheckListSchema.pre("countDocuments", function () {
	this.where({ isDeleted: false });
});

CheckListSchema.pre("find", function () {
	this.where({ isDeleted: false });
});

CheckListSchema.pre("findOne", function () {
	this.where({ isDeleted: false });
});

const CheckList = mongoose.model("checklist", CheckListSchema);

export default CheckList;
