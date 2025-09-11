function formatDate(style = "default", dateInput, options = {}) {
	if (dateInput == null || dateInput === "") return "";
	const locale = options.locale ?? "es-ES";
	const timeZone = options.timeZone ?? "America/Guayaquil";
	const parseAsUTC = options.parseAsUTC ?? true;
	const dateObject = parseInputToDate(dateInput, parseAsUTC);
	const effectiveTimeZone = parseAsUTC ? "UTC" : timeZone;
	const formatters = getFormatters(locale, effectiveTimeZone);

	switch (style) {
		case "long":
			return formatters.long.format(dateObject);
		case "short":
			return formatters.short.format(dateObject);
		case "custom": {
			const parts = formatters.parts.formatToParts(dateObject);
			const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
			const month = capitalize((get("month") || "").replace(/\.$/, ""));
			return `${month}, ${get("day")} de ${get("year")}`;
		}
		case "default":
		default:
			return formatters.default.format(dateObject);
	}
}

function parseInputToDate(input, parseAsUTC) {
	if (input instanceof Date) return input;

	const value = String(input);
	const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!ymd) {
		throw new TypeError('dateInput debe ser un Date o un string "YYYY-MM-DD"');
	}

	const [, y, m, d] = ymd.map(Number);
	return parseAsUTC ? new Date(Date.UTC(y, m - 1, d)) : new Date(y, m - 1, d);
}

const formatterCache = new Map();
function getFormatters(locale, timeZone) {
	const key = `${locale}|${timeZone}`;
	if (formatterCache.has(key)) return formatterCache.get(key);

	const set = {
		long: new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone }),
		short: new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone }),
		default: new Intl.DateTimeFormat(locale, { timeZone }),
		parts: new Intl.DateTimeFormat(locale, {
			day: "numeric",
			month: "short",
			year: "numeric",
			timeZone,
		}),
	};
	formatterCache.set(key, set);
	return set;
}

function capitalize(text) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

export default formatDate;
