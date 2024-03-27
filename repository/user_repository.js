import mongoose from "mongoose";
import User from "../model/user.model.js";
import { ServerError } from "../utils/ApiError.js";

const insert = async (data) => {
	return await User.create(data);
};

const findByFilter = async (filters = {}, limit, skip, sortCriteria) => {
	return await User.find(filters)
		.limit(limit && limit)
		.skip(skip && skip)
		.sort(sortCriteria)
		.populate("roleId");
};

const find = async (filters = {}) => {
	const data = await User.find(filters).lean();
	return data;
};

const findById = async ({ id, filters }) => {
	const data = await User.findOne({ _id: id, ...filters });
	if (!data) {
		throw new ServerError("User tidak ditemukan", 400);
	}

	return data;
};

const findByIdAndPopulate = async ({ id, filters }) => {
	const data = await User.findOne({ _id: id, ...filters }).populate({
		path: "outletId",
		select: "outletName",
	});
	// .populate('roleId -roleName');
	if (!data) {
		throw new ServerError("User tidak ditemukan", 400);
	}

	return data;
};

const findByUsername = async ({ username, filters }) => {
	const data = await User.findOne({ username, ...filters });
	if (!data) {
		throw new ServerError("User tidak ditemukan", 400);
	}

	return data;
};

const findByEmail = async ({ email, filters }) => {
	const data = await User.findOne({ email, ...filters });
	if (!data) {
		throw new ServerError("User tidak ditemukan", 400);
	}

	return data;
};

const total = async (filters = {}) => {
	const data = await User.countDocuments(filters);
	return data;
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const update = async ({ id, filters, newData, updatedBy }) => {
	try {
		// Use findByIdAndUpdate for atomic update and validation
		const data = await User.findByIdAndUpdate(
			id,
			{ $push: { updatedBy }, $set: newData },
			{ new: true, runValidators: true }
		);

		if (!data) {
			throw new ServerError("User tidak ditemukan", 400);
		}

		return data;
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			throw new ServerError(error.message, 400);
		}

		throw error;
	}
};

/**
 * Toggle the isActive status of a User.
 * @param {string} id - The ID of the User.
 * @returns {Promise<void>} - A promise that resolves when the isActive status is updated.
 * @throws {ServerError} - If the User is not found.
 */
const updateIsActive = async ({ id, filters, updatedBy }) => {
	const data = await findById({ id, filters });

	data.updatedBy.push(updatedBy);

	data.isActive = !data.isActive;
	await data.save();
	return data;
};

/**
 * Mark a User as deleted by setting the deletedAt field to the current date.
 * @param {string} id - The ID of the User.
 * @returns {Promise<void>} - A promise that resolves when the User is marked as deleted.
 * @throws {ServerError} - If the User is not found.
 */
const remove = async ({ id, filters, deletedBy }) => {
	const data = await findById({ id, filters });

	data.isDeleted = true;
	data.deletedBy = deletedBy;

	await data.save();
};

export default function makeUserDb() {
	return Object.freeze({
		insert,
		find,
		findByUsername,
		findByIdAndPopulate,
		findByFilter,
		findById,
		total,
		update,
		updateIsActive,
		remove,
	});
}
