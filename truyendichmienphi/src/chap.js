load("config.js");
load("crypto.js");

function execute(url) {
	const PASSPHRASE = "z4x8vog2a13vz4x8vog2a13v";
	const response = fetch(url);
	const decodedText = CryptoJS.AES.decrypt(
		response.json().content,
		PASSPHRASE,
	).toString(CryptoJS.enc.Utf8);
	const lines = decodedText.split("\n");
	lines.reverse();
	const content = lines.join("<br>");
	return Response.success(content);
}
