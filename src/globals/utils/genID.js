function genID() {
	return typeof crypto !== "undefined" && crypto.randomUUID
		? crypto.randomUUID()
		: `opt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export default genID;
