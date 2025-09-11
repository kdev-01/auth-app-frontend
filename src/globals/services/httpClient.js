import axios from "axios";
import { toast } from "sonner";

const httpClient = axios.create({
	baseURL: "http://127.0.0.1:8000/",
	withCredentials: true,
});

httpClient.interceptors.response.use(
	(res) => {
		if (res.status === 204) return null;
		return res.data ?? null;
	},
	(err) => {
		const cfg = err?.config || {};
		const suppress = cfg?.meta?.suppressErrorToast === true;

		const body = err?.response?.data;
		const message =
			body?.message ||
			body?.errors?.[0]?.msg ||
			err.message ||
			"Ocurrió un error inesperado.";

		if (!suppress) toast.error(message);

		const enriched = new Error(message);
		enriched.status = err?.response?.status;
		enriched.errors = body?.errors;
		enriched.code = body?.code;
		throw enriched;
	},
);

export default httpClient;
