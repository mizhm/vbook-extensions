load("config.js");
load("crypto.js");

function execute(url) {
	url = normalizeUrl(url);
	let response = request(url);
	if (!response.ok) return Response.error("HTTP " + response.status);
	let html = response.text();
	// Content URL/token live in an inline script; the body arrives as XOR'd base64 JSON.
	let contentUrl = html.match(/var contentUrl = "([^"]+)"/);
	let contentToken = html.match(/var contentToken = "([^"]+)"/);
	if (!contentUrl || !contentToken) return Response.error("Chương cần đăng nhập để đọc");
	let csrf = Html.parse(html).select("meta[name=csrf-token]").attr("content");
	let res = request(BASE_URL + contentUrl[1].replace(/\\\//g, "/"), {
		headers: {
			Accept: "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-TOKEN": csrf,
			"X-Content-Token": contentToken[1],
			Referer: url,
		},
	});
	let payload = res.json();
	// Guests can read only the first chapters; the server explains why in `reason`.
	if (!res.ok) return Response.error((payload && payload.reason) || "HTTP " + res.status);
	if (!payload.d || !payload.k) return Response.error("Nội dung chương chưa sẵn sàng");
	return Response.success(xorDecode(payload.d, payload.k).replace(/<img[^>]*>/gi, ""));
}

function xorDecode(data, key) {
	let words = CryptoJS.enc.Base64.parse(data);
	for (let i = 0; i < words.sigBytes; i++) {
		let shift = 24 - (i % 4) * 8;
		let k = key.charCodeAt(i % key.length) & 0xff;
		words.words[i >>> 2] ^= k << shift;
	}
	return CryptoJS.enc.Utf8.stringify(words);
}
