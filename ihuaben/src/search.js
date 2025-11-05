load("config.js");

function execute(key, page) {
	if (!page) {
		page = 1;
	}

	const html = fetch(`https://so.ihuaben.com/search`, {
		queries: {
			keyword: key,
			page: page.toString(),
			pageSize: "100",
		},
	}).html();

	const next = html.select(".pagination .active + a").text() ? page + 1 : null;

	const list = html.select(".searchresult").map((e) => {
		return {
			name: e.select("h2 a").text(),
			link: `https:${e.select("h2 a").attr("href")}`,
			host: BASE_URL,
			cover: `https:${e.select("img").attr("src")}`,
			description: e.select(".searchresult-info p").first().text(),
		};
	});
	return Response.success(list, next);
}
