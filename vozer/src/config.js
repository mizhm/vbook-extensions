let BASE_URL = "https://vozer.io";
let BASE_UA = "ua";
try {
	if (CONFIG_URL) {
		BASE_URL = CONFIG_URL;
	}

	if (CONFIG_UA) {
		BASE_UA = CONFIG_UA;
	}
} catch (error) {}
