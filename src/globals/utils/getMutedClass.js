function getMutedClass(value) {
	return value == null || value === "" ? "text-gray-400" : "";
}

export default getMutedClass;
