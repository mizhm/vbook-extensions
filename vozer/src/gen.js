load("config.js");
function execute(url, page) {
	if (!page) page = "1";
	const response = fetch(url, {
		method: "GET",
		queries: {
			page: page,
		},
	});
	if (response.ok) {
		const doc = response.html();
		const comiclist = [];
		let next = doc.select(".my-5 nav a").last().attr("href").match(/\d+$/);
		if (next != null) {
			next = next[0];
		}
		doc.select(".container .mb-3 .mx-auto .flex").forEach((e) => {
			comiclist.push({
				name: e.select("a").first().text(),
				link: e.select("a").attr("href"),
				cover: e.select("img").attr("src") || e.select("img").attr("src"),
				description: e.select("p a").first().text(),
				host: BASE_URL,
			});
		});
		return Response.success(comiclist, next);
	}
	return null;
}
