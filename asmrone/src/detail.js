load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let id = workId(url);
    if (!id) return Response.error("URL không hợp lệ");
    let w = apiGet("/api/work/" + id + "?v=2");
    if (!w) return Response.error("Không tải được tác phẩm");

    function filter(kind, name) {
        return "/api/search/" + encodeURIComponent("$" + kind + ":" + name + "$") + "?order=release&sort=desc";
    }
    let vas = (w.vas || []).map(function (v) { return v.name; });
    let genres = [{ title: "Circle: " + w.name, input: filter("circle", w.name), script: "search.js" }];
    (w.vas || []).forEach(function (v) {
        genres.push({ title: "CV: " + v.name, input: filter("va", v.name), script: "search.js" });
    });
    let tags = (w.tags || []).map(function (t) {
        let en = t.i18n && t.i18n["en-us"] ? t.i18n["en-us"].name : "";
        return { title: en || t.name, input: filter("tag", t.name), script: "search.js" };
    });

    let detail = w.source_id + "<br>Circle: " + w.name +
        "<br>CV: " + vas.join(", ") +
        "<br>Phát hành: " + w.release +
        "<br>Đánh giá: " + w.rate_average_2dp + " (" + w.rate_count + ")" +
        "<br>Lượt tải: " + w.dl_count +
        "<br>Phụ đề: " + (w.has_subtitle ? "Có" : "Không");

    return Response.success({
        name: w.title,
        author: vas.join(", ") || w.name,
        cover: API_URL + "/api/cover/" + w.id + ".jpg?type=main",
        description: w.title,
        detail: detail,
        url: BASE_URL + "/work/" + w.source_id,
        type: "audio",
        format: "album",
        ongoing: false,
        nsfw: !!w.nsfw,
        tags: tags,
        genres: genres
    });
}
