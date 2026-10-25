load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let key = shareKey(url);
    if (!key) return Response.error("URL không hợp lệ");
    let meta = apiGet("/api/audio/key/" + key + "/meta");
    if (!meta) return Response.error("Không tải được audio");
    return Response.success([{ name: meta.title, url: shareUrl(key), description: meta.artist, lock: false, pay: false }]);
}
