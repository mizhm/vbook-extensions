load("config.js");

function execute() {
	return Response.success([
		{
			title: "Truyện mới đăng",
			input: `${BASE_URL}/the-loai?sort=moi-dang`,
			script: "genrecontent.js",
		},
		{
			title: "Truyện dịch",
			input: `${BASE_URL}/the-loai?sort=doc-nhieu&quality=truyen-dich`,
			script: "genrecontent.js",
		},
		{
			title: "Truyện full",
			input: `${BASE_URL}/the-loai?state=da-hoan-thanh&sort=doc-nhieu`,
			script: "genrecontent.js",
		},
		{
			title: "Truyện mới cập nhật",
			input: `${BASE_URL}/the-loai?sort=moi-cap-nhat`,
			script: "genrecontent.js",
		},
		{
			title: "Đọc nhiều",
			input: `${BASE_URL}/the-loai?sort=doc-nhieu`,
			script: "genrecontent.js",
		},
	]);
}
