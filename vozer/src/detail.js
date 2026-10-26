load("config.js");

function execute(url) {
	let doc = fetchHtml(normalizeUrl(url));
	if (!doc) return Response.error("Failed to fetch data");
	let author = "";
	let info = [];
	doc.select(".qk-post-meta__item").forEach(function (e) {
		let text = e.text();
		if (e.select(".qk-post-meta__label").text().indexOf("Tác giả") === 0) {
			author = e.select(".qk-post-meta__value").text();
		}
		info.push(text);
	});
	let genres = [];
	doc.select(".qk-post-meta__cat").forEach(function (e) {
		genres.push({ title: e.text(), input: e.attr("href"), script: "gen.js" });
	});
	return Response.success({
		name: doc.select("h1.qk-post-title").text(),
		cover: doc.select(".qk-post-cover__img").attr("src"),
		author: author,
		description: doc.select(".qk-post-content .smiley").html(),
		detail: info.join("<br>"),
		ongoing: doc.select(".qk-post-status.is-completed").size() === 0,
		genres: genres,
		host: BASE_URL,
	});
}
