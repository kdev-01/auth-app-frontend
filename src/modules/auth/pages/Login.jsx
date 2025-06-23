import login from "@assets/login.jpeg";
import {
	BackgroundImage,
	Button,
	ImageLink,
	InputField,
	InternalLink,
} from "@globals/components";
import { AuthContext } from "@globals/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { authLogin } from "../services/authService";
import { loginDataValidation } from "../utils/userValidations";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginDataValidation),
	});
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	if (user?.is_logged) return <Navigate to="/dashboard" replace />;

	const onSubmit = async (data) => {
		try {
			const res = await authLogin(data);
			setUser({
				is_logged: true,
				...res,
			});
			navigate("/dashboard", { replace: true });
		} catch (error) {
			throw error;
		}
	};

	return (
		<main className="grid grid-cols-[3fr_2fr] h-screen overflow-hidden">
			<section className="flex flex-col justify-center items-center gap-5">
				<ImageLink to="/" src={logo} alt="Logo FDPEN" className="w-24" />
				<h1 className="text-2xl font-semibold mb-3">Inicio de sesión</h1>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full max-w-sm flex flex-col gap-2"
				>
					<InputField
						type="text"
						placeholder="kevin.tapia@gmail.com"
						name="email"
						register={register}
						error={errors}
					>
						Correo electrónico
					</InputField>

					<InputField
						type="password"
						name="password"
						register={register}
						error={errors}
					>
						Contraseña
					</InputField>

					<InternalLink to="/">¿Olvidaste tu contraseña?</InternalLink>

					<Button type="submit" className="mt-5">
						Iniciar sesión
					</Button>
				</form>
			</section>

			<BackgroundImage src={login} alt="Evento de Basket Femenino" />
		</main>
	);
}

export default Login;
