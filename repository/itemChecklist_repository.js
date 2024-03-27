import mongoose from "mongoose";
import CheckItem from "../model/itemChecklist.model.js";
import { ServerError } from "../utils/ApiError.js";

const insert = async (data) => {
	return await CheckItem.create(data);
};

const findByFilter = async (filters = {}, limit, skip, sortCriteria) => {
	return await CheckItem.find(filters)
		.limit(limit && limit)
		.skip(skip && skip)
		.sort(sortCriteria)
		.populate("roleId");
};

const find = async (filters = {}) => {
	const data = await CheckItem.find(filters).populate("checkListId");
	return data;
};

const findById = async ({ id, filters }) => {
	const data = await CheckItem.findOne({ _id: id, ...filters });
	if (!data) {
		throw new ServerError("CheckItem tidak ditemukan", 400);
	}

	return data;
};

const findByIdAndPopulate = async ({ id, filters }) => {
	const data = await CheckItem.findOne({ _id: id, ...filters }).populate({
		path: "outletId",
	});
	if (!data) {
		throw new ServerError("CheckItem tidak ditemukan", 400);
	}

	return data;
};

const total = async (filters = {}) => {
	const data = await CheckItem.countDocuments(filters);
	return data;
};

/**
 * Update CheckItem by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<CheckItem>}
 */
const update = async ({ id, filters, newData, updatedBy }) => {
	try {
		// Use findByIdAndUpdate for atomic update and validation
		const data = await CheckItem.findByIdAndUpdate(
			id,
			{ $push: { updatedBy }, $set: newData },
			{ new: true, runValidators: true }
		);

		if (!data) {
			throw new ServerError("CheckItem tidak ditemukan", 400);
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
 * Toggle the isActive status of a CheckItem.
 * @param {string} id - The ID of the CheckItem.
 * @returns {Promise<void>} - A promise that resolves when the isActive status is updated.
 * @throws {ServerError} - If the CheckItem is not found.
 */
const updateIsActive = async ({ id, filters, updatedBy }) => {
	const data = await findById({ id, filters });

	data.updatedBy.push(updatedBy);

	data.isActive = !data.isActive;
	await data.save();
	return data;
};

/**
 * Mark a CheckItem as deleted by setting the deletedAt field to the current date.
 * @param {string} id - The ID of the CheckItem.
 * @returns {Promise<void>} - A promise that resolves when the CheckItem is marked as deleted.
 * @throws {ServerError} - If the CheckItem is not found.
 */
const remove = async ({ id, filters, deletedBy }) => {
	const data = await findById({ id, filters });

	data.isDeleted = true;
	data.deletedBy = deletedBy;

	await data.save();
};

export default function makeCheckItemDb() {
	return Object.freeze({
		insert,
		find,
		findByIdAndPopulate,
		findByFilter,
		findById,
		total,
		update,
		updateIsActive,
		remove,
	});
}
