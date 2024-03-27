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

// filter by name and type
export const listItem = async (req) => {
	const dataList = await endpointService.listDoc({
		dbAccess,
		filters: {},
		mapping,
	});

	return successResponse(dataList);
};

export const remove = async (req) => {
	const {
		params: { id },
		user,
		originalUrl,
	} = req;

	await endpointService.removeDoc({
		dbAccess,
		id,
		user,
		originalUrl,
	});

	return successResponse({}, "data was removed");
};
