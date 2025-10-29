load("config.js");

function execute(url, page) {
	if (!page) page = 1;
	const data = fetch(`${url}&page=${page}`).json();

	if (!data) return Response.error("Failed to fetch data");

	let next = null;
	if (page + 1 <= data.totalPages) next = page + 1;

	const list = data.map((novel) => {
		return {
			name: novel.title,
			link: `${BASE_URL}/truyen/${novel.slug}`,
			host: BASE_URL,
			cover: `https://s3-hcm-r2.s3cloud.vn/tdmp/${novel.poster_url}`,
			description: novel.description,
		};
	});

	return Response.success(list, next);
}
