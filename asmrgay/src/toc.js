load('config.js');
// Media files of the folder and its sub-folders (OpenList types: 2 video, 3 audio),
// one section header per sub-folder that holds media.
let MAX_DEPTH = 3;
// Artist folders hold 100+ works; cap folder listings so the TOC still loads.
let MAX_LISTS = 40;
let lists = 0;

function sizeText(bytes) {
    return bytes >= 1073741824 ? (bytes / 1073741824).toFixed(1) + " GB" : Math.round(bytes / 1048576) + " MB";
}

function walk(path, label, depth, out) {
    if (lists++ >= MAX_LISTS) return;
    let data = api("list", { path: path, page: 1, per_page: 0, refresh: false });
    if (!data) return;
    let header = label ? { name: label, url: pageUrl(path), type: "section" } : null;
    let dirs = [];
    (data.content || []).forEach(function (c) {
        if (c.is_dir) {
            dirs.push(c.name);
            return;
        }
        if (c.type !== 2 && c.type !== 3) return;
        if (header) {
            out.push(header);
            header = null;
        }
        out.push({ name: c.name, url: pageUrl(path + "/" + c.name), description: sizeText(c.size), lock: false, pay: false });
    });
    if (depth >= MAX_DEPTH) return;
    dirs.forEach(function (name) {
        walk(path + "/" + name, label ? label + " / " + name : name, depth + 1, out);
    });
}

function execute(url) {
    let tracks = [];
    walk(pagePath(url), "", 0, tracks);
    if (tracks.length === 0) return Response.error("Thư mục không có file audio/video");
    return Response.success(tracks);
}
