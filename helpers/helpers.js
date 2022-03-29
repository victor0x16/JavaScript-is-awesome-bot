function toString(code) {
	if (typeof code === "undefined") return "";

	let str = code.toString();
	str = String(str);
	
	return str;
}

module.exports.toString = toString;
