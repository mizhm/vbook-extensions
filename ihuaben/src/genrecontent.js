load("config.js");

function execute(url, page) {
	if (!page) page = 1;
	const html = fetch(`${url}/clickcount_days_7/${page}.html`).html();
	const next =
		html.select(".pagination .active + a").text().length > 0
			? parseInt(page) + 1
			: null;
	const list = html.select(".booklist li").map((e) => {
		return {
			name: e.select("h3 a").text(),
			link: `https:${e.select("h3 a").attr("href")}`,
			host: BASE_URL,
			cover: `https:${e.select("img").attr("src")}`,
			description: e.select(".text-lightgrey").first().text(),
		};
	});
	return Response.success(list, next);
}
