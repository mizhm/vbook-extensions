load("config.js");
load("util.js");

function execute(url) {
	const apiURL = getAPIURL(url);
	const data = fetch(`${apiURL}/chapters`, {
		limit: 100,
		page: 1,
		sortBy: "chaper_number:asc",
	}).json();

	if (!data) return Response.error("Failed to fetch data");

	const pages = [];

	for (let i = 1; i <= data.totalPages; i++) {
		pages.push(
			`${apiURL}/chapters/?limit=100&page=${i}&sortBy=chapter_number:asc`,
		);
	}

	return Response.success(pages);
}
