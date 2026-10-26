let BASE_URL = "https://asmr18.fans";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

// WordPress post URLs end with "/"; the app strips it.
function normalizeUrl(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    return /\/$/.test(url) ? url : url + "/";
}
