load("config.js");

function execute(url) {
	let doc = fetch(url, {
		headers: {
			"User-Agent": BASE_UA,
		},
	}).html();
	let content = doc.select(".smiley").html();
	content = content
		.replace(/\n/gm, "<br>")
		.replace(/&(nbsp|amp|quot|lt|gt|bp|emsp);/g, "")
		.replace(/(<br\s*\/?>( )?){2,}/g, "<br>")
		.replace(/<img[^>]*>/gi, "")
		.replace(/<\/?p[^>]*>/gi, "");
	return Response.success(content);
}
