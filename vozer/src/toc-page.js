load("config.js");

function execute(url) {
	let doc = fetchHtml(normalizeUrl(url).replace(/\?.*$/, ""));
	if (!doc) return Response.error("Failed to fetch data");
	let endpoint = chapterEndpoint(doc);
	if (!endpoint) return Response.error("Chapter list not found");
	let response = postChapters(endpoint, 1, saveCsrf(doc));
	if (!response.ok) return Response.error("HTTP " + response.status);
	let lastPage = response.json().lastPage;
	let data = [];
	for (let i = 1; i <= lastPage; i++) {
		data.push(endpoint + "?page=" + i);
	}
	return Response.success(data);
}
