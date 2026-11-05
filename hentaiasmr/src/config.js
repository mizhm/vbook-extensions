let BASE_URL = "https://hentaiasmr.moe";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}
// The media CDNs return 403 without the site Referer.
// The CDN also 403s the app's default okhttp/Dalvik User-Agent, so send a player one.
let MEDIA_HEADERS = { "Referer": BASE_URL + "/", "User-Agent": "ExoPlayerLib/2.19.1" };

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}
