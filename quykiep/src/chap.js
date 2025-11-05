load("config.js");

function execute(url) {
	const data = JSON.parse(fetch(url).html().select("#__NEXT_DATA__").html());
	const content = data.props.pageProps.chapter.content
		.split("\n")
		.join("<br/>");
	return Response.success(content);
}
