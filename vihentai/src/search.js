load("config.js");
load("util.js");

function execute(key, page) {
	if (!page) page = 1;
	const doc = fetch(
		`${BASE_URL}?tim-kiem?sort=-views&keyword=${key}&filter[status]=2,1&page=${page}`,
	).html();
	let next = null;

	const lastPageLink = doc
		.select(
			"a[class='flex items-center justify-center w-10 h-10 overflow-hidden rounded-full !px-0 hover:bg-[#5d5d5d5c] transition-all']",
		)
		.last()
		.attr("href");
	const regex = /\bpage=(\d+)/;

	const match = lastPageLink.match(regex);
	if (match && match.length > 1) {
		const pageNumberString = match[1];
		const pageNumber = parseInt(pageNumberString, 10);
		if (page + 1 <= pageNumber) {
			next = page + 1;
		}
	}

	const data = doc.select(".manga-vertical").map((e) => {
		return {
			name: e.select("a[class='text-ellipsis']").first().text(),
			link: BASE_URL + e.select("a").last().attr(`href`),
			host: BASE_URL,
			cover: getBgImgURL(e.select(".cover").first().attr("style")),
			description: e.select("a[class='text-white']").first().text(),
		};
	});

	return Response.success(data, next);
}
