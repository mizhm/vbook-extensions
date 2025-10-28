load("config.js");
load("util.js");

function execute(key, page) {
	if (!page) page = 1;
	sleepRandom(100, 1000);
	const doc = fetch(`${BASE_URL}/tim-kiem`, {
		headers: {
			"User-Agent": "vb",
		},
		queries: {
			sort: "-views",
			"filter[status]": "2,1",
			keyword: key,
			page: page,
		},
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
