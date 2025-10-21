let BASE_URL = "https://vozer.io";
// let BASE_UA = "PostmanRuntime/7.48.0";
// let BASE_UA =
// 	"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

let BASE_UA = "demo";
try {
	if (CONFIG_URL) {
		BASE_URL = CONFIG_URL;
	}

	if (CONFIG_UA) {
		BASE_UA = CONFIG_UA;
	}
} catch (error) {}
