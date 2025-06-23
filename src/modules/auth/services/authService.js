import httpClient from "@globals/services/httpClient";

export const authLogin = async (data) => {
	const res = await httpClient.post("auth/login", data);
	console.log(res);
	return res.data;
};
