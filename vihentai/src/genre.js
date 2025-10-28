load("config.js");

function execute() {
	const doc = fetch(BASE_URL).html();
	console.log(doc);
	const data = doc.select("ul[class='grid grid-cols-2'] > a").map((e) => {
		return {
			title: e.select("span").last().text(),
			input: BASE_URL + e.attr("href"),
			script: "genrecontent.js",
		};
	});
	return Response.success(data);
}
