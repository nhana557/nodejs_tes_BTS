import { timestamps } from "../config/timestamps.config.js";
import splitUrl from "../utils/split.js";

/**
 * Generates timestamps with user and description for tracking actions.
 *
 * @param {string} user - The user performing the action.
 * @param {string} originalUrl - The original URL associated with the action.
 * @returns {object} Timestamps object with user and description.
 */
const addTimestamps = (user, originalUrl) => {
	const [path, action] = splitUrl(originalUrl);
	return timestamps({
		user,
		description: `${action} ${path}`,
	});
};

/**
 * Inserts a new document with created timestamp.
 *
 * @param {object} options - Options for inserting the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {object} options.newData - New data to insert.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves with the inserted document.
 */
const insertDoc = async ({ dbAccess, newData, user = {}, originalUrl }) => {
	const createdBy = addTimestamps(user, originalUrl);
	const dataToInsert = { ...newData, createdBy };
	return await dbAccess.insert(dataToInsert);
};

const listDoc = async ({ dbAccess, mapping }) => {
	const data = await dbAccess.find();
	return data.map((value) => mapping(value));
};

/**
 * Retrieves a single item from a database by its unique identifier and maps it to a desired format.
 *
 * @param {object} options - An object containing the following properties:
 * @param {object} options.dbAccess - The database access object that provides methods for querying the database.
 * @param {string} options.id - The unique identifier of the item to retrieve.
 * @param {object} [options.filters] - Additional filters parameters (optional).
 * @param {function} options.mapping - A mapping function that transforms the database record into a desired format.
 * @returns {Promise} - A Promise that resolves to the transformed data for the specified item.
 */
const detailDoc = async ({ dbAccess, id, filters, mapping, populate }) => {
	const data = await dbAccess.findById({ id, filters, populate });

	return mapping(data);
};

/**
 * Updates a document with new data and records the updater's timestamp.
 *
 * @param {object} options - Options for updating the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.id - ID of the document to update.
 * @param {object} [options.filters] - Additional filters parameters (optional).
 * @param {object} options.newData - New data for updating the document.
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the document is updated.
 */
const updateDoc = async ({ dbAccess, id, filters, newData, user = {}, originalUrl }) => {
	const updatedBy = addTimestamps(user, originalUrl);
	return await dbAccess.update({ id, filters, newData, updatedBy });
};

/**
 * Updates the 'isActive' field of a document.
 *
 * @param {object} options - Options for updating the 'isActive' field of the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.id - ID of the document to update.
 * @param {object} [options.filters] - Additional filters parameters (optional).
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the 'isActive' field of the document is updated.
 */
const updateIsActiveDoc = async ({ dbAccess, id, filters, user = {}, originalUrl }) => {
	const updatedBy = addTimestamps(user, originalUrl);
	return await dbAccess.updateIsActive({ id, filters, updatedBy });
};

/**
 * Removes a document and records the deleter's timestamp.
 *
 * @param {object} options - Options for removing the document.
 * @param {object} options.dbAccess - Database access object.
 * @param {string} options.id - ID of the document to remove.
 * @param {object} [options.filters] - Additional filters parameters (optional).
 * @param {object} [options.user={}] - The user performing the action.
 * @param {string} options.originalUrl - The original URL associated with the action.
 * @returns {Promise} Resolves after the document is removed.
 */
const removeDoc = async ({ dbAccess, id, user = {}, originalUrl }) => {
	const deletedBy = addTimestamps(user, originalUrl);
	await dbAccess.remove({ id, deletedBy });
};

export default {
	insertDoc,
	listDoc,
	detailDoc,
	updateDoc,
	updateIsActiveDoc,
	removeDoc,
};
