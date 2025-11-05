load("config.js");

function execute() {
	const html = fetch(`${BASE_URL}/the-loai`).html();
	const list = html
		.select("section")
		.get(1)
		.select("a")
		.map((e) => {
			return {
				title: e.text(),
				input: `${BASE_URL}${e.attr("href")}?sort=doc-nhieu`,
			};
		});

	return Response.success(list);
}
