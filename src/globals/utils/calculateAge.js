function calculateAge(dateOfBirth) {
	if (!dateOfBirth) return null;

	const today = new Date();
	const [year, month, day] = dateOfBirth.split("-").map(Number);

	const birthDate = new Date(year, month - 1, day);

	let age = today.getFullYear() - birthDate.getFullYear();
	const hasHadBirthdayThisYear =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() &&
			today.getDate() >= birthDate.getDate());

	if (!hasHadBirthdayThisYear) {
		age--;
	}

	return age;
}

export default calculateAge;
