import loginImg from "@assets/login.jpeg";
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
import logo from "/logo.png";
import useLogin from "../hooks/useLogin";
import { loginDataValidation } from "../utils/userValidations";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginDataValidation),
	});
	const { login, loading } = useLogin();
	const { user } = useContext(AuthContext);
	if (user?.is_logged) return <Navigate to="/dashboard" replace />;

	return (
		<main className="grid grid-cols-[3fr_2fr] h-screen overflow-hidden">
			<section className="flex flex-col justify-center items-center gap-5">
				<ImageLink to="/" src={logo} alt="Logo FDPEN" className="w-24" />
				<h1 className="text-2xl font-semibold mb-3">Inicio de sesión</h1>

				<form
					onSubmit={handleSubmit(login)}
					className="w-full max-w-sm flex flex-col gap-1"
				>
					<InputField
						type="text"
						placeholder="nombre.apellido@gmail.com"
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

					<Button type="submit" isLoading={loading} className="mt-5">
						Iniciar sesión
					</Button>
				</form>
			</section>

			<BackgroundImage src={loginImg} alt="Evento de Basket Femenino" />
		</main>
	);
}

export default Login;
