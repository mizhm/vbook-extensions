load("config.js");

function execute() {
	return Response.success([
		{
			title: "Nổi bật",
			input: `${API_URL}/api/novels/random?limit=100`,
			script: "home-content.js",
		},
		{
			title: "Top lượt đọc",
			input: `${API_URL}/api/novels/top-read?limit=100`,
			script: "home-content.js",
		},
		{
			title: "Top đề cử",
			input: `${API_URL}/api/novels/popular?limit=100`,
			script: "home-content.js",
		},
		{
			title: "Vừa lên chương",
			input: `${API_URL}/api/novels/latest?limit=100`,
			script: "home-content.js",
		},
		{
			title: "Mới hoàn thành",
			input: `${API_URL}/api/novels/completed?limit=100`,
			script: "home-content.js",
		},
	]);
}
