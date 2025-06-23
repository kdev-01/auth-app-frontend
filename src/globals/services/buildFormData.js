export function buildFormData(jsonData, files = {}) {
	const formData = new FormData();

	formData.append("data", JSON.stringify(jsonData));

	Object.entries(files).forEach(([key, file]) => {
		if (file) formData.append(key, file);
	});

	return formData;
}
