load("config.js");

function execute(url, page) {
	const data = fetch(url, {
		queries: {
			limit: 200,
			offset: 0,
		},
	}).json();
	return Response.success(
		data.book_list.map((book) => {
			return {
				name: book.book_name,
				link: `${API_URL}/detail?book_id=${book.book_id}`,
				cover: book.thumb_url,
			};
		}),
		null,
	);
}
