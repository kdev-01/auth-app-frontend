import { httpClient } from "@globals/services";

const API = {
	INSTITUTIONS: "institutions/",
	CITIES: "cities/",
};

// GET
export const getAllInstitutions = async (params = {}) => {
	const body = await httpClient.get(API.INSTITUTIONS, { params });
	return body?.data ?? [];
};

export const getAllCities = async () => {
	const body = await httpClient.get(API.CITIES);
	return body?.data ?? [];
};

// POST
export const createInstitution = async (payload) => {
	return await httpClient.post(API.INSTITUTIONS, payload, {
		meta: { suppressErrorToast: true },
	});
};

// PUT
export const updateInstitution = async (id, payload) => {
	return await httpClient.put(`${API.INSTITUTIONS}${id}`, payload, {
		meta: { suppressErrorToast: true },
	});
};

// DELETE
export const unaffiliateInstitution = async (id) => {
	return await httpClient.delete(`${API.INSTITUTIONS}${id}/affiliation`, {
		meta: { suppressErrorToast: true },
	});
};
