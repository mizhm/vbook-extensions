load("config.js");

function execute(url) {
	const data = fetch(url).json();

	return Response.success({
		name: data.data.book_name,
		cover: data.data.expand_thumb_url,
		host: BASE_URL,
		author: data.data.author_info.user_name,
		description: data.data.abstract,
		ongoing: data.data.status === "1",
	});
}
