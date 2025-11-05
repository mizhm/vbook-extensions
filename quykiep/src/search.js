load("config.js");

function execute(key, page) {
	const data = fetch(`${BASE_URL}/api/book-search`, {
		method: "POST",
		body: JSON.stringify({
			keyword: key,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).json();
	const list = data.data.map((book) => {
		return {
			name: book.name,
			link: `${BASE_URL}/truyen/${book.slug}`,
			host: BASE_URL,
			cover: `${BASE_URL.replace("quykiep", "static.quykiep")}${book.coverUrl}`,
			description: book.introduction,
		};
	});
	return Response.success(list, null);
}
