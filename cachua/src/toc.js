load("config.js");

function execute(url) {
	const book_id = fetch(url).json().data.book_id;

	const data = fetch(`${BASE_URL}/api/reader/directory/detail`, {
		queries: {
			bookId: book_id,
		},
	}).json();

	const list = [];

	data.data.chapterListWithVolume.forEach((volume) => {
		volume.forEach((chapter) => {
			list.push({
				name: chapter.title,
				url: `${API_URL}/content?item_id=${chapter.itemId}`,
				host: BASE_URL,
			});
		});
	});

	return Response.success(list);
}
