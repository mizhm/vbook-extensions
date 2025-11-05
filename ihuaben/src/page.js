load("config.js");

function execute(url) {
	const bookId = url.match(/\/book\/(\d+)\.html/)[1];
	const html = fetch(`${BASE_URL}/list/${bookId}.html`).html();
	const totalChapters = html.select(".number").first().text();
	const list = Array.from({
		length: Math.ceil(parseInt(totalChapters) / 40),
	}).map((_, i) => {
		return `${BASE_URL}/list/${bookId}.html?sortType=0&page=${i + 1}`;
	});
	return Response.success(list);
}
