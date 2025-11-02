load("config.js");
load("util.js");

function execute(url) {
	const apiURL = getAPIURL(url);
	const data = fetch(`${apiURL}/chapters`, {
		limit: 99999,
		page: 1,
		sortBy: "chaper_number:asc",
	}).json();

	return Response.success(
		data.results.map((toc) => {
			return {
				name: `Chap ${toc.chapter_number}: ${toc.title}`,
				url: `${apiURL}/chapter/${toc.chapter_number}`,
				host: BASE_URL,
			};
		}),
	);
}
