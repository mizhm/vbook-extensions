load("config.js");

function execute(url) {
	const doc = fetch(url).html();

	const list = doc.select("ul[class='overflow-y-auto overflow-x-hidden'] a");

	const data = [];

	for (let i = list.size() - 1; i >= 0; i--) {
		data.push({
			name: list.get(i).select(".text-ellipsis").first().text(),
			url: BASE_URL + list.get(i).attr("href"),
			host: BASE_URL,
		});
	}

	return Response.success(data);
}
