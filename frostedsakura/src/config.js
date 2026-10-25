let BASE_URL = "https://stash.frostedsakura.my.id";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

// OpenList JSON API: POST /api/fs/<action>; returns `data` or null.
function api(action, body) {
    body.password = "";
    let response = fetch(BASE_URL + "/api/fs/" + action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!response.ok) return null;
    let json = response.json();
    return json.code === 200 ? json.data : null;
}

// Site page URL <-> storage path ("/Youtube/Ceres Fauna").
function pagePath(url) {
    return decodeURIComponent(normalizeUrl(url).substring(BASE_URL.length).replace(/[?#].*$/, ""));
}

function pageUrl(path) {
    return BASE_URL + path.split("/").map(encodeURIComponent).join("/");
}

function folderItem(path, c) {
    return { name: c.name, link: pageUrl(path), description: path.replace(/\/[^\/]*$/, ""), tag: (c.modified || "").substring(0, 10) };
}
