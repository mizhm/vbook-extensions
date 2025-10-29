load("config.js");

function execute(url, page) {
	const data = fetch(`${url}`).json();
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

	return Response.success(list, page);
}
