load("config.js");
load("util.js");

function execute(url, page) {
	const doc = fetch(url).html();

	const data = doc.select("div[class='gap-3 grid'] .w-full").map((e) => {
		return {
			name: e
				.select(
					"a[class='text-ellipsis font-semibold hover:text-secondary-accent']",
				)
				.last()
				.text(),
			link:
				BASE_URL +
				e
					.select(
						"a[class='text-ellipsis font-semibold hover:text-secondary-accent']",
					)
					.last()
					.attr(`href`),
			host: BASE_URL,
			cover: getBgImgURL(e.select(".cover-sm").first().attr("style")),
			description: e.select("span[class='text-sm break-all']").first().text(),
		};
	});

	return Response.success(data, null);
}
