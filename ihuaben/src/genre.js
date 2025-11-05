load("config.js");

function execute() {
	const girl = fetch(`${BASE_URL}/girl/`).html();
	const boy = fetch(`${BASE_URL}/boy/`).html();
	const tongren = fetch(`${BASE_URL}/tongren/`).html();
	const list = [];

	girl.select(".sublist a").forEach((e) => {
		list.push({
			title: `女频 - ${e.text()}`,
			input: `https:${e.attr("href")}`,
			script: "genrecontent.js",
		});
	});

	boy.select(".sublist a").forEach((e) => {
		list.push({
			title: `男频 - ${e.text()}`,
			input: `https:${e.attr("href")}`,
			script: "genrecontent.js",
		});
	});

	tongren.select(".sublist a").forEach((e) => {
		list.push({
			title: `同人 - ${e.text()}`,
			input: `https:${e.attr("href")}`,
			script: "genrecontent.js",
		});
	});

	return Response.success(list);
}
