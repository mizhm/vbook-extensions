load("config.js");

function execute() {
	return Response.success([
		{ title: "Truyện hot", input: BASE_URL, script: "homecontent2.js" },
		{ title: "Truyện đề cử", input: BASE_URL, script: "homecontent3.js" },
		{
			title: "Truyện mới",
			input: BASE_URL + "/danh-sach",
			script: "genrecontent.js",
		},
	]);
}
