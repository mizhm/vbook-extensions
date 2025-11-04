load("config.js");

function execute(url) {
	const htmlText = fetch(url).text();

	const regex = /window\.__INITIAL_STATE__\s*=\s*({.*});/;
	const match = htmlText.match(regex);
	const data = JSON.parse(match[1]);

	return Response.success({
		name: data.page.bookName,
		cover: data.page.thumbUrl,
		host: BASE_URL,
		author: data.page.author,
		description: data.page.abstract,
		ongoing: data.page.status === 1,
	});
}
