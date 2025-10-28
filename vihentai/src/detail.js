load("config.js");
load("util.js");

function execute(url) {
	const doc = fetch(url).html();
	if (!doc) {
		return null;
	}
	const coverStyle = doc
		.select("div[class='cover-frame rounded-lg bg-cover']")
		.first()
		.attr("style");

	let cover = getBgImgURL(coverStyle);

	return Response.success({
		name: doc
			.select("span[class='grow text-lg ml-1 line-clamp-2 font-semibold']")
			.first()
			.text(),
		cover: cover,
		host: BASE_URL,
		author: doc
			.select("a[href^='/tac-gia/']")
			.map((e) => e.text())
			.join(", "),
		description: doc.select(".mg-plot").first().text(),
		ongoing: doc.select(".grow").text().indexOf("Đã hoàn thành") === -1,
		nsfw: true,
	});
}
