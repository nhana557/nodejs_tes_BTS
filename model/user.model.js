import mongoose from "mongoose";
import { ServerError } from "../utils/ApiError.js";

const UserSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
	},
	passwordHash: {
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
UserSchema.post("save", function (error, doc, next) {
	if (error.code === 11000) {
		const uniqueFields = Object.keys(error.keyValue);
		const errorMessage = uniqueFields.map((field) => `${field} must be unique`).join(", ");
		throw new ServerError(errorMessage, 400);
	}
	next();
});

UserSchema.pre("countDocuments", function () {
	this.where({ isDeleted: false });
});

UserSchema.pre("find", function () {
	this.where({ isDeleted: false });
});

UserSchema.pre("findOne", function () {
	this.where({ isDeleted: false });
});

const User = mongoose.model("user", UserSchema);

export default User;
