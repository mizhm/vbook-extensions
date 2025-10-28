load("config.js");

function execute(url) {
	const doc = fetch(url).html();

	const data = doc
		.select("ul[class='overflow-y-auto overflow-x-hidden'] a")
		.map((e) => {
			return {
				name: e.select(".text-ellipsis").first().text(),
				url: BASE_URL + e.attr("href"),
				host: BASE_URL,
			};
		});

	return Response.success(data);
}
