load("config.js");

function execute(url) {
	const data = fetch(url).json();

	if (!data) return Response.error("Failed to fetch data");

	const detailURL = url.split("?")[0].replace("/chapters", "");

	const tocs = data.results.map((toc) => {
		return {
			name: `Chap ${toc.chapter_number}: ${toc.title}`,
			url: `${detailURL}chapter/${toc.chapter_number}`,
			host: BASE_URL,
		};
	});

	return Response.success(tocs);
}
