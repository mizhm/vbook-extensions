load("config.js");

function execute(url) {
	const html = fetch(url).html();
	const content = html.select("#contentsource").html();
	return Response.success(content);
}
