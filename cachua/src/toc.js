load("config.js");

function execute(url) {
	const htmlText = fetch(url).text();

	const regex = /window\.__INITIAL_STATE__\s*=\s*({.*});/;
	const match = htmlText.match(regex);
	const data = JSON.parse(match[1]);

	const list = [];

	data.page.chapterListWithVolume.forEach((volume) => {
		volume.forEach((chapter) => {
			list.push({
				name: chapter.title,
				url: `${API_URL}/content?item_id=${chapter.itemId}`,
				host: BASE_URL,
			});
		});
	});

	return Response.success(list);
}
