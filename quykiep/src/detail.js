load("config.js");

function execute(url) {
	const data = JSON.parse(fetch(url).html().select("#__NEXT_DATA__").html());
	const book = data.props.pageProps.book;

	return Response.success({
		name: book.name,
		cover: `${BASE_URL.replace("quykiep", "static.quykiep")}${book.coverUrl}`,
		host: BASE_URL,
		author: book.author.name,
		description: book.introduction,
		ongoing: book.state === 0,
	});
}
