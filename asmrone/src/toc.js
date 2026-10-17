load('config.js');
// Track URLs use the stable /api/media/stream/<hash> endpoint, which redirects to a
// freshly signed CDN URL; the mediaStreamUrl in the tree is dated and expires.
// A same-folder subtitle with the same base name is passed along as ?sub=<hash>.
let AUDIO_EXT = /\.(mp3|wav|flac|m4a|aac|ogg|opus|mp4)$/i;
let SUB_EXT = /\.(lrc|vtt|srt)$/i;

function baseName(title) {
    return title.replace(SUB_EXT, "").replace(AUDIO_EXT, "").toLowerCase();
}

function walk(nodes, path, out) {
    let subs = {};
    nodes.forEach(function (n) {
        if (n.type !== "folder" && SUB_EXT.test(n.title)) subs[baseName(n.title)] = n.hash;
    });
    // One section header per folder that directly holds audio; url kept unique per folder.
    let header = path ? { name: path, url: API_URL + "/api/tracks/" + encodeURIComponent(path), type: "section" } : null;
    nodes.forEach(function (n) {
        if (n.type === "folder") {
            walk(n.children || [], path ? path + " / " + n.title : n.title, out);
            return;
        }
        if (n.type !== "audio") return;
        if (header) {
            out.push(header);
            header = null;
        }
        let url = API_URL + "/api/media/stream/" + n.hash;
        let sub = subs[baseName(n.title)];
        if (sub) url += "?sub=" + encodeURIComponent(sub);
        let mins = Math.round((n.duration || 0) / 60);
        out.push({ name: n.title, url: url, description: mins ? mins + " phút" : "", lock: false, pay: false });
    });
}

function execute(url) {
    url = normalizeUrl(url);
    let id = workId(url);
    if (!id) return Response.error("URL không hợp lệ");
    let tree = apiGet("/api/tracks/" + id + "?v=1");
    if (!tree) return Response.error("Không tải được danh sách track");

    let tracks = [];
    walk(tree, "", tracks);
    if (tracks.length === 0) return Response.error("Tác phẩm không có file audio");
    return Response.success(tracks);
}
