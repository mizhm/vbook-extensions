load("config.js");

function execute(url, page) {
	if (!page) page = "1";
	const html = fetch(`${url}&page=${page}`).html();

	const data = JSON.parse(html.select("#__NEXT_DATA__").html());

	const list = data.props.pageProps.data
		.filter((book) => book.chapterCount != null)
		.map((book) => {
			return {
				name: book.name,
				link: `${BASE_URL}/truyen/${book.slug}`,
				host: BASE_URL,
				cover: `${BASE_URL.replace("quykiep", "static.quykiep")}${book.coverUrl}`,
				description: `${book.chapterCount} chương`,
			};
		});

	const next = html.select("a[aria-current='page'] + a").text();

	return Response.success(list, next);
}
