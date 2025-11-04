load("config.js");

function execute() {
	const data = fetch(`${BASE_URL}/api/author/book/category_list/v0`).json();
	const list = data.data.map((genre) => {
		return {
			title: genre.name,
			input: `${BASE_URL}/api/author/library/book_list/v0/?category_id=${genre.category_id}`,
			script: "genrecontent.js",
		};
	});

	return Response.success(list);
}
