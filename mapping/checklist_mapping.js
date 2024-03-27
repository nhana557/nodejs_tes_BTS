import { mappingDefault } from "../config/mapping.config.js";

export const mappingChecklist = (row) => ({
	id: row._id || "",
	name: row.name || "",
	...mappingDefault(row),
});
