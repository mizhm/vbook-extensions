load("config.js");

function execute(url) {
	const bookId = url.match(/\/book\/(\d+)\.html/)[1];
	const html = fetch(`${BASE_URL}/list/${bookId}.html`, {
		queries: {
			sortType: "0",
			pageSize: "99999",
		},
	}).html();
	const list = html.select(".chapters p a").map((e) => {
		return {
			name: e.text(),
			url: `https:${e.attr("href")}`,
			host: BASE_URL,
		};
	});
	return Response.success(list);
}
