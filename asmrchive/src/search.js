load('config.js');
// query is a keyword, or an API path ("/api/...") from home/genre/detail.
// The page token is a result offset.
let PAGE_SIZE = 50;

function execute(query, page) {
    query = query || "";
    let offset = parseInt(page || "0");

    // Playback lists and channel folders come back whole; page through them locally.
    if (query.indexOf("/api/playback/") === 0 || query.indexOf("/api/browse/") === 0) {
        let json = apiGet(query);
        if (!json) return Response.error("Không tải được danh sách");
        let list = (json.tracks || json.items).filter(function (a) { return !a.type || a.type === "audio"; });
        if (json.items) list.sort(function (a, b) { return a.modifiedAt < b.modifiedAt ? 1 : -1; });
        let next = offset + PAGE_SIZE < list.length ? String(offset + PAGE_SIZE) : "";
        return Response.success(list.slice(offset, offset + PAGE_SIZE).map(toItem), next);
    }

    let path = query.indexOf("/api/search") === 0 ? query : "/api/search?type=audio&q=" + encodeURIComponent(query);
    let json = apiGet(path + "&includeMature=true&limit=" + PAGE_SIZE + "&offset=" + offset);
    if (!json || !json.results) return Response.error("Không tải được danh sách");
    let next = offset + json.count < json.total ? String(offset + json.count) : "";
    return Response.success(json.results.map(toItem), next);
}
