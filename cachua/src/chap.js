load("config.js");

function execute(url) {
	const data = fetch(url).json();
	const content = data.data.content.split("\n").join("<br>");
	return Response.success(content);
}
