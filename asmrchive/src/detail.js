load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let key = shareKey(url);
    if (!key) return Response.error("URL không hợp lệ");
    let meta = apiGet("/api/audio/key/" + key + "/meta");
    if (!meta) return Response.error("Không tải được audio");

    let date = meta.uploadDate ? meta.uploadDate.replace(/^(\d{4})(\d\d)(\d\d)$/, "$1-$2-$3") : "";
    return Response.success({
        name: meta.title,
        author: meta.artist,
        cover: meta.thumbnail ? thumbUrl(key) : "",
        description: (meta.description || "").replace(/\n/g, "<br>"),
        detail: "Kênh: " + meta.artist + "<br>Ngày đăng: " + date + "<br>Nguồn: " + (meta.webpageUrl || "") +
            (meta.unavailableAt ? "<br>Bản gốc đã bị gỡ" : ""),
        url: shareUrl(key),
        type: "audio",
        format: "audio",
        ongoing: false,
        nsfw: !!meta.isMature,
        genres: [{
            title: "Kênh: " + meta.artist,
            input: "/api/browse/" + meta.parentPath.split("/").map(encodeURIComponent).join("/"),
            script: "search.js"
        }]
    });
}
