import { AuthContext } from "@globals/contexts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../services/authService";

function useLogin() {
	const [loading, setLoading] = useState(false);
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const login = async (payload) => {
		try {
			setLoading(true);
			const res = await authLogin(payload);
			const userData = {
				...res.data,
				is_logged: true,
				session: {
					...res.data?.session,
					menu: res.data?.session?.menu || [],
				},
			};
			setUser(userData);
			navigate("/dashboard", { replace: true });
		} catch (err) {
			// Error already handled by the interceptor; no further action required here.
		} finally {
			setLoading(false);
		}
	};

	return { login, loading };
}

export default useLogin;
