import axios from "axios";
import { toast } from "sonner";

const httpClient = axios.create({
	baseURL: "http://127.0.0.1:8000/",
	withCredentials: true,
});

httpClient.interceptors.response.use(
	(res) => res,
	(err) => {
		const ignorePaths = ["auth/me/permissions"];
		const reqPath = err?.config?.url || "";

		if (!ignorePaths.includes(reqPath)) {
			const data = err?.response?.data;

			const message =
				data?.errors?.[0]?.msg ||
				data?.message ||
				err.message ||
				"Ocurrió un error inesperado.";

			toast.error(message);
		}

		return Promise.reject(err);
	},
);

export default httpClient;
