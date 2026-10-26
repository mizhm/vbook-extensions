load("config.js");

function execute() {
	let doc = fetchHtml(BASE_URL);
	if (!doc) return Response.error("Failed to fetch data");
	let data = [];
	doc.select(".qk-cat-menu__item").forEach(function (e) {
		data.push({ title: e.text(), input: e.attr("href"), script: "gen.js" });
	});
	return Response.success(data);
}
