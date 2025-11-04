load("config.js");

function execute() {
	return Response.success([
		{
			title: "TOP bảng xếp hạng",
			input: `${BASE_URL}/api/author/misc/top_book_list/v1/`,
			script: "homecontent.js",
		},
	]);
}
