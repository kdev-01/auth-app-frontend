import { z } from "zod";

const collapseSpaces = (s) => s.replace(/\s+/g, " ").trim();
const ONLYLETTERS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

// Validations for user entity

export const emailValidations = z
	.string({
		required_error: "El correo es un campo obligatorio.",
		invalid_type_error: "El correo debe ser una cadena de texto.",
	})
	.trim()
	.min(5, { message: "El correo debe tener al menos 5 caracteres." })
	.max(100, { message: "El correo no debe exceder los 100 caracteres." })
	.email({ message: "El formato del correo electrónico no es válido." })
	.transform((val) => val.trim());

export const passwordValidations = z
	.string({
		required_error: "La contraseña es un campo obligatorio.",
		invalid_type_error: "La contraseña debe ser una cadena de texto.",
	})
	.min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
	.max(20, { message: "La contraseña no debe exceder los 20 caracteres." });
/*.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
		message: "Debe contener al menos una mayúscula, una minúscula y un número.",
	});*/

export const nationalIDValidations = z
	.string({
		required_error: "La cédula de identidad es un campo obligatorio.",
		invalid_type_error: "La cédula de identidad debe ser una cadena de texto.",
	})
	.min(10, {
		message: "La cédula de identidad debe tener al menos 10 caracteres.",
	})
	.max(10, {
		message: "La cédula de identidad no debe exceder los 10 caracteres.",
	});

export const firstNameValidations = z
	.string({ required_error: "El nombre es obligatorio." })
	.min(1, "El nombre no puede estar vacío.")
	.max(50, "El nombre no debe superar los 50 caracteres.")
	.regex(ONLYLETTERS, {
		message: "El nombre solo debe contener letras y espacios.",
	})
	.transform(collapseSpaces);

export const lastNameValidations = z
	.string({ required_error: "El apellido es obligatorio." })
	.min(2, "El apellido debe tener al menos 2 caracteres.")
	.max(50, "El apellido no debe superar los 50 caracteres.")
	.regex(ONLYLETTERS, {
		message: "El apellido solo debe contener letras y espacios.",
	})
	.transform(collapseSpaces);

export const phoneNumberValidations = z
	.string({ required_error: "El número de teléfono es obligatorio." })
	.min(10, "El número de teléfono debe tener al menos 10 caracteres.")
	.max(10, "El número de teléfono no debe exceder los 10 caracteres.")
	.regex(/^[0-9]+$/, {
		message: "El número de teléfono solo debe contener números.",
	})
	.transform(collapseSpaces);

export const selectValidation = z
	.string({
		required_error: "Debes seleccionar una opción.",
	})
	.min(1, "Debes seleccionar una opción válida.");

// Validations for Institution entity
export const institutionNameValidations = z
	.string({
		required_error: "El nombre de la institución es obligatorio.",
		invalid_type_error: "El nombre debe ser una cadena de texto.",
	})
	.min(3, { message: "El nombre debe tener al menos 3 caracteres." })
	.max(100, { message: "El nombre no debe exceder los 100 caracteres." })
	.regex(/^[\p{L}\p{N}\s.,\-()&/]+$/u, {
		message:
			"El nombre solo puede contener letras, números, espacios y . , - ( ) & /",
	})
	.transform(collapseSpaces);
