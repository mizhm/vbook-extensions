load("config.js");

// Input is a page URL from toc-page.js (<endpoint>?page=N), or a story URL.
function execute(url) {
	url = normalizeUrl(url);
	let endpoint = url.replace(/\?.*$/, "");
	let page = url.match(/[?&]page=(\d+)/);
	page = page ? parseInt(page[1]) : 1;
	let token = cacheStorage.getItem("csrf");
	if (!/\/post\/\d+\/chapters$/.test(endpoint)) {
		let doc = fetchHtml(endpoint);
		if (!doc) return Response.error("Failed to fetch data");
		endpoint = chapterEndpoint(doc);
		token = saveCsrf(doc);
	}
	let response = token ? postChapters(endpoint, page, token) : null;
	if (!response || response.status === 419) {
		let doc = fetchHtml(BASE_URL);
		if (!doc) return Response.error("Failed to fetch data");
		response = postChapters(endpoint, page, saveCsrf(doc));
	}
	if (!response.ok) return Response.error("HTTP " + response.status);
	let data = [];
	Html.parse(response.json().html).select(".chapter-list-flow-item a, a.lazy-catalog-row[href]").forEach(function (e) {
		data.push({
			name: e.attr("title").replace(/\s*-\s*Cập nhật:.*$/, ""),
			url: e.attr("href"),
			host: BASE_URL,
		});
	});
	return Response.success(data);
}
