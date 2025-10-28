load("config.js");
load("util.js");

function execute(key, page) {
	const data = fetch(`${BASE_URL}/api/novels/search`, {
		queries: {
			limit: 100,
			q: slugify(key),
		},
	}).json();

	if (!data) return Response.error("Failed to fetch data");

	const list = [];
	data.forEach((novel) => {
		list.push({
			name: novel.title,
			link: `${BASE_URL}/api/novels/${novel.slug}`,
			host: BASE_URL,
			cover: `https://s3-hcm-r2.s3cloud.vn/tdmp/${novel.poster_url}`,
			description: novel.description,
		});
	});

	return Response.success(list, null);
}
