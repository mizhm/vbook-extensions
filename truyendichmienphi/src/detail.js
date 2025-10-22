load("config.js");

function execute(url) {
	const data = fetch(url).json();

	if (!data) return null;

	const detail = `Views: ${data.view_count}\nChapters: ${data.total_chapters}\nTypes: ${data.types.map((type) => type.name).join(", ")}`;

	return Response.success({
		name: data.title,
		cover: `https://s3-hcm-r2.s3cloud.vn/tdmp/${data.poster_url}`,
		host: BASE_URL,
		author: data.author_name,
		description: data.description,
		detail: detail,
		ongoing: data.status !== "completed",
	});
}
