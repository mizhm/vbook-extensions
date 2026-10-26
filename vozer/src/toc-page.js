load("config.js");

function execute(url) {
	let doc = fetchHtml(normalizeUrl(url).replace(/\?.*$/, ""));
	if (!doc) return Response.error("Failed to fetch data");
	let endpoint = chapterEndpoint(doc);
	if (!endpoint) return Response.error("Chapter list not found");
	let response = postChapters(endpoint, 1, saveCsrf(doc));
	if (!response.ok) return Response.error("HTTP " + response.status);
	let json = response.json();
	let data = [endpoint + "?page=1"];
	if (json.lastPage <= 1) return Response.success(data);
	// The list endpoint allows ~20 requests/minute, so pages after the first are
	// generated from page 1's link pattern (.../chuong-N) instead of fetched.
	let links = chapterLinks(json.html);
	let first = links.size() ? links.get(0).attr("href") : "";
	let size = links.size();
	if (!/\d+(\.html)?$/.test(first)) return Response.success(data);
	let tpl = first.replace(/\d+(\.html)?$/, "{n}$1");
	for (let i = 2; i <= json.lastPage; i++) {
		data.push(endpoint + "?page=" + i + "&size=" + size + "&total=" + json.total + "&tpl=" + encodeURIComponent(tpl));
	}
	return Response.success(data);
}
