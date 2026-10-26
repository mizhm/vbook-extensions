load("config.js");

function execute(key, page) {
	let response = request(BASE_URL + "/search", {
		queries: { keyword: key, page: page || "1" },
	});
	if (!response.ok) return Response.error("HTTP " + response.status);
	return parseCards(response.html());
}
