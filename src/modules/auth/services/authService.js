import { httpClient } from "@globals/services";

export const authLogin = async (payload) => {
	return await httpClient.post("auth/login", payload);
};
