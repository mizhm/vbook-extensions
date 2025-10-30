load("config.js");

function execute() {
	const genres = fetch(`${API_URL}/api/types/genres`).json();
	const literaryStyles = fetch(`${API_URL}/api/types/literary-styles`).json();
	const worldSettings = fetch(`${API_URL}/api/types/world-settings`).json();
	const characterPersonalities = fetch(
		`${API_URL}/api/types/character-personalities`,
	).json();

	if (!genres || !literaryStyles || !worldSettings || !characterPersonalities) {
		return Response.error("Failed to fetch genre data");
	}

	const data = [];

	genres.forEach((genre) => {
		data.push({
			title: genre.name,
			input: `${BASE_URL}/api/novels/?genres=${genre.slug}`,
			script: "genre-content.js",
		});
	});

	literaryStyles.forEach((genre) => {
		data.push({
			title: genre.name,
			input: `${BASE_URL}/api/novels/?literary_styles=${genre.slug}`,
			script: "genre-content.js",
		});
	});

	worldSettings.forEach((genre) => {
		data.push({
			title: genre.name,
			input: `${BASE_URL}/api/novels/?world_settings=${genre.slug}`,
			script: "genre-content.js",
		});
	});

	characterPersonalities.forEach((genre) => {
		data.push({
			title: genre.name,
			input: `${BASE_URL}/api/novels/?character_personalities=${genre.slug}`,
			script: "genre-content.js",
		});
	});

	return Response.success(data);
}
