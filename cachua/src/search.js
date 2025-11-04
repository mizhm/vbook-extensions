load("config.js");

function execute(key, page) {
	if (!page) page = "0";

	const data = fetch(`${BASE_URL}/api/author/search/search_book/v0`, {
		queries: {
			filter: "127,127,127,127",
			page_count: "10",
			page_index: page,
			query_word: key,
		},
	}).json();

	page = parseInt(page);

	const next = data.data.total_count > (page + 1) * 10 ? page + 1 : null;

	const list = data.data.search_book_data_list.map((book) => {
		return {
			name: book.book_name,
			link: `${API_URL}/detail?book_id=${book.book_id}`,
			host: BASE_URL,
			cover: book.thumb_url,
			description: book.abstract,
		};
	});
	return Response.success(list, next.toString());
}
