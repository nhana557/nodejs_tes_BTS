import makeCheckItemDb from "../repository/itemChecklist_repository.js";
import { mappingCheckItems } from "../mapping/checkltems_mapping.js";
import { itemCheckValidator } from "../validation/itemCheckl.validator.js";

import endpointService from "../service/endpoint.service.js";

import { successResponse } from "../utils/response.js";

const dbAccess = makeCheckItemDb();

const mapping = mappingCheckItems;

export const addItem = async (req) => {
	const {
		body,
		user,
		originalUrl,
		params: { id },
	} = req;

	const validatedData = itemCheckValidator(body);

	const newData = {
		itemName: validatedData.getItemName(),
		checkListId: id,
	};

	await endpointService.insertDoc({
		dbAccess,
		newData,
		user,
		originalUrl,
	});

	return successResponse({}, "success add data");
};

export const listItem = async (req) => {
	const {
		params: { id },
	} = req;

	const dataList = await endpointService.listDoc({
		dbAccess,
		filters: { checkListId: id },
		mapping,
	});

	return successResponse(dataList);
};

export const detailItem = async (req) => {
	const {
		params: { idItem, id },
	} = req;
	const dataList = await endpointService.detailDoc({
		dbAccess,
		id: idItem,
		populate: "checkListId",
		filters: { checkListId: id },
		mapping,
	});

	return successResponse(dataList);
};

export const updateIsActive = async (req) => {
	const {
		params: { idItem },
		user,
		originalUrl,
	} = req;

	await endpointService.updateIsActiveDoc({
		dbAccess,
		id: idItem,
		user,
		originalUrl,
	});

	return successResponse({}, "data was updated");
};

export const updateItem = async (req) => {
	const {
		params: { idItem },
		user,
		originalUrl,
		body,
	} = req;

	const validatedData = itemCheckValidator(body);

	const newData = {
		itemName: validatedData.getItemName(),
	};
	await endpointService.updateDoc({
		dbAccess,
		id: idItem,
		newData,
		user,
		originalUrl,
	});

	return successResponse({}, "data was updated");
};

export const removeItem = async (req) => {
	const {
		params: { idItem },
		user,
		originalUrl,
	} = req;

	await endpointService.removeDoc({
		dbAccess,
		id: idItem,
		user,
		originalUrl,
	});

	return successResponse({}, "data was removed");
};
