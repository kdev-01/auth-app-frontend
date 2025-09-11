import { httpClient } from "@globals/services";

// GET
export const getAllUsers = async () => {
	const body = await httpClient.get("users/");
	return body?.data ?? [];
};

export const getAllRoles = async () => {
	const body = await httpClient.get("auth/roles/");
	return body?.data ?? [];
};

// POST
export const inviteUser = async (payload) => {
	return await httpClient.post("users/invitation/", payload, {
		meta: { suppressErrorToast: true },
	});
};

// DELETE
export const deleteUser = async (id) => {
	return await httpClient.delete(`/users/${id}`, {
		meta: { suppressErrorToast: true },
	});
};

// UPDATE
export const updateUser = async (id, data) => {
	return await httpClient.put(`/users/${id}`, data);
};
