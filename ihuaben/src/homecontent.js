load("config.js");

function execute(url, page) {
	const html = fetch(url).html();
	const list = html.select(".cover-list li").map((e) => {
		return {
			name: e.select("h4 a").text(),
			link: `https:${e.select("h4 a").attr("href")}`,
			host: BASE_URL,
			cover: `https:${e.select("img").attr("src")}`,
			description: e.select(".text-lightgrey").first().text(),
		};
	});

	return Response.success(list, null);
}
