load("config.js");
load("util.js");

function execute(key, page) {
	const data = fetch(`${API_URL}/api/novels/search`, {
		queries: {
			limit: 100,
			q: slugify(key),
		},
	}).json();

	if (!data) return Response.error("Failed to fetch data");

	const list = data.map((novel) => {
		return {
			name: novel.title,
			link: `${BASE_URL}/truyen/${novel.slug}`,
			host: BASE_URL,
			cover: `https://s3-hcm-r2.s3cloud.vn/tdmp/${novel.poster_url}`,
			description: novel.description,
		};
	});

	return Response.success(list, null);
}
