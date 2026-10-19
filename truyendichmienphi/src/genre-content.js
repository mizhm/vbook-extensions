load("config.js");

function execute(url, page) {
	page = parseInt(page || "1");
	const data = fetch(`${url}&page=${page}&limit=20&sortBy=last_update_chapter_at:desc`).json();

	if (!data || !data.results) return Response.error("Failed to fetch data");

	const next = page < data.totalPages ? String(page + 1) : "";

	const list = data.results.map((novel) => {
		return {
			name: novel.title,
			link: `${BASE_URL}/truyen/${novel.slug}`,
			host: BASE_URL,
			cover: `${ASSET_URL}/${novel.poster_url}`,
			description: novel.description,
		};
	});

	return Response.success(list, next);
}
