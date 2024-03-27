import CheckList from "../model/checklist.model.js";
import { ServerError } from "../utils/ApiError.js";

const insert = async (data) => {
	return await CheckList.create(data);
};

const findByFilter = async (filters = {}, limit, skip, sortCriteria) => {
	return await CheckList.find(filters)
		.limit(limit && limit)
		.skip(skip && skip)
		.sort(sortCriteria)
		.populate("roleId");
};

const find = async () => {
	const data = await CheckList.find();
	return data;
};

const findById = async ({ id, filters }) => {
	const data = await CheckList.findOne({ _id: id, ...filters });
	if (!data) {
		throw new ServerError("CheckList tidak ditemukan", 400);
	}

	return data;
};

/**
 * Mark a CheckList as deleted by setting the deletedAt field to the current date.
 * @param {string} id - The ID of the CheckList.
 * @returns {Promise<void>} - A promise that resolves when the CheckList is marked as deleted.
 * @throws {ServerError} - If the CheckList is not found.
 */
const remove = async ({ id, deletedBy }) => {
	const data = await findById({ id });

	data.isDeleted = true;
	data.deletedBy = deletedBy;
	console.log(data);
	await data.save();
};

export default function makeCheckListDb() {
	return Object.freeze({
		insert,
		find,
		findByFilter,
		findById,
		remove,
	});
}
