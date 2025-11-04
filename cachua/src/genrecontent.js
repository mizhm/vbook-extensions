load("config.js");

function execute(url, page) {
	if (!page) {
		page = "0";
	}

	const data = fetch(
		`${url}&book_type=-1&page_count=50&page_index=${page}`,
	).json();

	page = parseInt(page);

	const next = data.data.has_more ? page + 1 : null;

	const list = data.data.book_list.map((book) => {
		return {
			name: book.book_name,
			link: `${BASE_URL}/page/${book.book_id}`,
			host: BASE_URL,
			cover: book.thumb_url,
			description: book.abstract,
		};
	});

	return Response.success(list, next.toString());
}
