import { httpClient } from "@globals/services";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const getUser = () =>
		httpClient.get("auth/me/permissions", {
			meta: { suppressErrorToast: true },
		});

	useEffect(() => {
		const verifySession = async () => {
			try {
				const res = await getUser();
				setUser({ ...res, is_logged: true });
			} catch (err) {
				setUser({ is_logged: false });
			} finally {
				setLoading(false);
			}
		};

		verifySession();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
