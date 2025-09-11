function normalizeOptions(data = []) {
	return data.map((item) => {
		const keys = Object.keys(item);
		const idKey = keys.find((key) => key.toLowerCase().includes("id"));
		const valueKey = keys.find((key) => key !== idKey);

		return {
			id: item[idKey],
			value: item[valueKey],
		};
	});
}

export default normalizeOptions;
