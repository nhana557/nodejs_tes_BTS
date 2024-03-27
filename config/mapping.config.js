const timestampsMapping = (row) => ({
	date: row?.date || "",
	unixDate: row?.unixDate || "",
});

export const mappingDefault = (row) => ({
	isActive: row.isActive || false,
	createdBy: row.createdBy ? timestampsMapping(row.createdBy) : {},
	updatedBy: row.updatedBy ? row.updatedBy.map((value) => timestampsMapping(value)) : [],
	// deletedBy: row?.deletedBy.map((value) => timestampsMapping(value)) || [],
});
