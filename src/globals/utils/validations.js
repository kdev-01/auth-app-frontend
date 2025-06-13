import { z } from "zod";

// Validations for user entity
export const emailValidations = z
	.string()
	.min(1, { message: "El correo es un campo obligatorio." })
	.max(100, { message: "El correo no debe exceder los 100 caracteres." })
	.email({ message: "El formato del correo electrónico no es válido" });

export const passwordValidations = z
	.string()
	.min(1, { message: "La contraseña es un campo obligatorio." })
	.max(20, { message: "El contraseña no debe exceder los 20 caracteres." });
