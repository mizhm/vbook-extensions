load("config.js");

function execute() {
	return Response.success([
		{ title: "Trending", input: BASE_URL, script: "homecontent.js" },
	]);
}
