import { mappingDefault } from "../config/mapping.config.js";

export const mappingCheckItems = (row) => ({
	id: row._id || "",
	itemName: row.itemName || "",
	checkListData: row.checkListId || "",
	...mappingDefault(row),
});
