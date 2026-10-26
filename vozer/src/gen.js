load("config.js");

function execute(url, page) {
	let response = request(url, { queries: { page: page || "1" } });
	if (!response.ok) return Response.error("HTTP " + response.status);
	return parseCards(response.html());
}
