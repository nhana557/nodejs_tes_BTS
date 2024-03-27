import { validateType } from "../utils/validator.js";
import { StatusCodes } from "http-status-codes";
import { ServerError } from "../utils/ApiError.js";

export const itemCheckValidator = ({ itemName }) => {
	if (!itemName || !validateType(itemName, "string"))
		throw new ServerError("Name checklist diperlukan dan harus berupa teks", StatusCodes.BAD_REQUEST);

	return {
		getItemName: () => itemName,
	};
};
