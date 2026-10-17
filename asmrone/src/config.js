let BASE_URL = "https://asmr.one";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}
// Every mirror serves its JSON API from the api. subdomain (asmr.one -> api.asmr.one).
let API_URL = BASE_URL.replace(/^(https?:\/\/)(www\.)?/, "$1api.");
let API_HEADERS = { "Referer": "https://www.asmr.one/", "Origin": "https://www.asmr.one" };

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function apiGet(path) {
    let response = fetch(API_URL + path, { headers: API_HEADERS });
    if (!response.ok) return null;
    return response.json();
}

// "RJ01712782" -> 1712782 (the API id is the code's number without padding).
function workId(url) {
    let m = url.match(/\/work\/[A-Z]{2}0*(\d+)/);
    return m ? m[1] : "";
}

function toItem(w) {
    return {
        name: w.title,
        cover: API_URL + "/api/cover/" + w.id + ".jpg?type=240x240",
        link: BASE_URL + "/work/" + w.source_id,
        description: w.name + (w.has_subtitle ? " · Có phụ đề" : ""),
        tag: w.source_id
    };
}
