load("config.js");

function execute(url) {
	const doc = fetch(url, {
		headers: {
			"User-Agent": BASE_UA,
		},
	}).html();
	return Response.success({
		name: doc.select("h1").text(),
		cover: doc.select("#chapter_001 img").first().attr("src"),
		description: doc.select(".smiley p").html(),
		author: doc.select("p strong").get(2).text(),
		detail: doc
			.select("div[class='p-2 leading-7 text-justify lg:flex-1']")
			.html(),
		ongoing: doc.select("p strong").get(3).text().trim() !== "Hoàn Thành",
		host: BASE_URL,
	});
}
