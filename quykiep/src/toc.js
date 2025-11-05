load("config.js");

function execute(url) {
	const data = JSON.parse(fetch(url).html().select("#__NEXT_DATA__").html());
	const list = data.props.pageProps.chapterList.map((chapter) => {
		return {
			name: chapter.name,
			url: `${BASE_URL}/truyen/${data.props.pageProps.book.slug}/${chapter.slug}`,
			host: BASE_URL,
		};
	});
	return Response.success(list);
}
