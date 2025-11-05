load("config.js");

function execute(url) {
	const data = JSON.parse(fetch(url).html().select("#__NEXT_DATA__").html());
	const number = data.props.pageProps.book.chapterCount;
	const list = Array.from({ length: Math.ceil(number / 50) }).map((_, i) => {
		return `${url}/danh-sach-chuong?page=${i + 1}`;
	});
	return Response.success(list);
}
