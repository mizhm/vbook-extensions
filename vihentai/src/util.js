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

function sleepRandom(minMillis, maxMillis) {
	const delay =
		Math.floor(Math.random() * (maxMillis - minMillis + 1)) + minMillis;
	sleep(delay);
}
