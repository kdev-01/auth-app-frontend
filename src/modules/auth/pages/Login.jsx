import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@globals/components";
import { InputField } from "@globals/components";
import { loginDataValidation } from "../utils/userValidations";
import { ImageLink } from "@globals/components";
import { InternalLink } from "@globals/components";
import { BackgroundImage } from "@globals/components";
import login from "@assets/login.jpeg";
import logo from "/logo.png";

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginDataValidation),
	});

	return (
		<main className="grid grid-cols-[3fr_2fr] h-screen overflow-hidden">
			<section className="flex flex-col justify-center items-center gap-5">
				<ImageLink to="/" src={logo} alt="Logo FDPEN" className="w-24" />
				<h1 className="text-2xl font-semibold mb-3">Inicio de sesión</h1>

				<form
					onSubmit={handleSubmit((data) => console.log(data))}
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

					<Button type="submit" className="bg-blue-900 text-neutral-50 mt-5">
						Iniciar sesión
					</Button>
				</form>
			</section>

			<BackgroundImage src={login} alt="Evento de Basket Femenino" />
		</main>
	);
}

export default Login;
