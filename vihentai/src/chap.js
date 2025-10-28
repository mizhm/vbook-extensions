load("config.js");

function execute(url) {
	const doc = fetch(url).html();
	const img = doc.select('img[class="max-w-full my-0 mx-auto"]');
	const data = img.map((e) => e.attr("src"));

	return Response.success(data);
}
