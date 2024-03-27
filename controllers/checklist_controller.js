import makeChecklistDb from "../repository/checklist_repository.js";
import { mappingChecklist } from "../mapping/checklist_mapping.js";
import { checkListValidator } from "../validation/checklist.validator.js";

import endpointService from "../service/endpoint.service.js";

import { successResponse } from "../utils/response.js";

const dbAccess = makeChecklistDb();

const mapping = mappingChecklist;

export const add = async (req) => {
	const { body, user, originalUrl, outlet } = req;

	const validatedData = checkListValidator(body);

	const newData = {
		name: validatedData.getName(),
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
export const list = async (req) => {
	const dataList = await endpointService.listDoc({
		dbAccess,
		filters: {},
		mapping,
	});
	console.log(dataList);

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
