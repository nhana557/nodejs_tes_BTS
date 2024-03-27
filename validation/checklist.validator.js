import { validateType } from "../utils/validator.js";
import { StatusCodes } from "http-status-codes";
import { ServerError } from "../utils/ApiError.js";

export const checkListValidator = ({ name }) => {
	if (!name || !validateType(name, "string"))
		throw new ServerError("Name checklist diperlukan dan harus berupa teks", StatusCodes.BAD_REQUEST);

	return {
		getName: () => name,
	};
};
// TODO : Fix this custom mapping
