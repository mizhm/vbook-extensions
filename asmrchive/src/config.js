let BASE_URL = "https://asmrchive.moe";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function apiGet(path) {
    let response = fetch(BASE_URL + path);
    if (!response.ok) return null;
    return response.json();
}

function shareKey(url) {
    let m = url.match(/\/share\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : "";
}

function shareUrl(key) {
    return BASE_URL + "/share/" + key;
}

// Mature items get a blurred thumbnail unless the session opted in; blurred is fine.
function thumbUrl(key) {
    return BASE_URL + "/api/audio/key/" + key + "/thumbnail";
}

function toItem(a) {
    return {
        name: a.title || a.name,
        link: shareUrl(a.shareKey),
        cover: thumbUrl(a.shareKey) + "?size=card",
        description: a.artist || a.parentFolderName || "",
        tag: a.modifiedAt || ""
    };
}
