load("config.js");
load("util.js");

function execute(url, page) {
	if (!page) page = 1;
	const queries = {
		page: page,
	};

	if (!url.includes("danh-sach")) {
		queries["sort"] = "-views";
		queries["filter[status]"] = "2,1";
	}
	sleepRandom(100, 1000);
	const doc = fetch(url, {
		headers: {
			"User-Agent": "vb",
		},
		queries: queries,
	}).html();

	const next = doc
		.select(
			"a[class='flex items-center justify-center w-10 h-10 overflow-hidden rounded-full !px-0 hover:bg-[#5d5d5d5c] transition-all bg-[#5d5d5d5c]'] + a",
		)
		.text();

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
