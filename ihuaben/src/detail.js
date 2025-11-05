load("config.js");

function execute(url) {
	const html = fetch(url).html();
	const bigInfo = html.select(".biginfo").first();
	return Response.success({
		name: bigInfo.select("h1").text(),
		cover: `https:${bigInfo.select(".cover img").attr("src")}`,
		host: BASE_URL,
		author: bigInfo.select("a[href^='//user']").text(),
		description: html.select(".aboutbook").html(),
		ongoing: true,
		// genres: [{ title: "title", input: "input", script: "genrecontent.js" }],
	});
}
