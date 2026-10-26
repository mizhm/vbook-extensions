let BASE_URL = "https://hentaiasmr.moe";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}
// The media CDNs return 403 without the site Referer.
let MEDIA_HEADERS = { "Referer": BASE_URL + "/" };

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}
