let BASE_URL = "https://quykhu.com";
try {
	if (CONFIG_URL) {
		BASE_URL = CONFIG_URL;
	}
} catch (error) {}

// quykhu.com answers 403 to requests without Accept-Language.
const HEADERS = { "Accept-Language": "vi-VN,vi;q=0.9" };

function normalizeUrl(url) {
	return url.replace(/^https?:\/\/(www\.)?(vozer\.io|quykhu\.com)/, BASE_URL);
}

// The site rate-limits with 429 + Retry-After; wait once and retry.
function request(url, options) {
	options = options || {};
	options.headers = Object.assign({}, HEADERS, options.headers);
	let response = fetch(url, options);
	if (response.status === 429) {
		let wait = parseInt(response.header("retry-after")) || 3;
		sleep(Math.min(wait, 10) * 1000);
		response = fetch(url, options);
	}
	return response;
}

function fetchHtml(url) {
	let response = request(url);
	return response.ok ? response.html() : null;
}

function parseCards(doc) {
	let list = [];
	doc.select(".qk-post-card").forEach(function (e) {
		let title = e.select(".qk-post-card__title").first();
		list.push({
			name: title.text(),
			link: title.attr("href"),
			cover: e.select(".qk-post-card__thumb img").attr("src"),
			description: e.select(".qk-post-card__info > p").first().text(),
			host: BASE_URL,
		});
	});
	let next = doc.select(".qk-home-pagination a[rel=next]").attr("href").match(/page=(\d+)/);
	return Response.success(list, next ? next[1] : "");
}

// CSRF token is bound to the session cookie, so one token serves every chapter-list POST.
function saveCsrf(doc) {
	let token = doc.select("meta[name=csrf-token]").attr("content");
	if (token) cacheStorage.setItem("csrf", token);
	return token;
}

function postChapters(endpoint, page, token) {
	return request(endpoint, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-CSRF-TOKEN": token,
			Origin: BASE_URL,
		},
		body: JSON.stringify({ page: page }),
	});
}

// Short stories render a flow list; long ones a lazy catalog whose locked rows have no link.
function chapterLinks(html) {
	return Html.parse(html).select(".chapter-list-flow-item a, a.lazy-catalog-row[href]");
}

function chapterEndpoint(doc) {
	return doc.select("[data-chapter-list]").attr("data-endpoint");
}
