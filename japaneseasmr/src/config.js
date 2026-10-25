let BASE_URL = "https://japaneseasmr.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}
// The media CDN rejects requests without the site Referer.
let MEDIA_HEADERS = { "Referer": BASE_URL + "/" };

// WordPress post URLs end with "/"; the app strips it.
function normalizeUrl(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    return /\/$/.test(url) ? url : url + "/";
}
