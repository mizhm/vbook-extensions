load("config.js");
load("util.js");

function execute(url) {
	const apiURL = getAPIURL(url);
	const data = fetch(apiURL).json();

	if (!data) return null;

	const detail = `<p>Views: ${data.view_count}</p><p>Chapters: ${data.total_chapters}\n\n</p><p>Types: ${data.types.map((type) => type.name).join(", ")}</p>`;

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
