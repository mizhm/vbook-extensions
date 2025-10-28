function getBgImgURL(cssValue) {
	const regex = /url\((?:'|")?(.+?)(?:'|")?\)/i;
	const match = cssValue.match(regex);

	if (match && match.length > 1) {
		let url = match[1];
		url = url.trim().replace(/^['"]|['"]$/g, "");
		return url;
	}

	return null;
}
