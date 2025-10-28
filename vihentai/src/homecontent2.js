load("config.js");
load("util.js");

function execute(url, page) {
	const doc = fetch(url).html();

	const data = doc.select(".glide .manga-vertical").map((e) => {
		return {
			name: e.select("a[class='text-ellipsis']").first().text(),
			link: BASE_URL + e.select("a").last().attr(`href`),
			host: BASE_URL,
			cover: getBgImgURL(e.select(".cover").first().attr("style")),
			description: e.select("a[class='text-white']").first().text(),
		};
	});

	return Response.success(data, null);
}
