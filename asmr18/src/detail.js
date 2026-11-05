load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    // #post-tag is "<span>label</span><a>..</a>, <a>..</a>" runs; group links by label.
    let groups = {};
    let detail = [];
    let label = "";
    doc.select("#post-tag span, #post-tag a").forEach(function (el) {
        if (!el.attr("href")) {
            label = String(el.text());
            groups[label] = [];
            detail.push(label);
        } else if (label) {
            groups[label].push({ title: el.text(), input: el.attr("href"), script: "search.js" });
        }
    });
    let names = function (key) {
        return (groups[key] || []).map(function (t) { return t.title; }).join(", ");
    };
    // App does not render `tags`, so every group and the category go into genres.
    let genres = [];
    detail = detail.map(function (key) {
        genres = genres.concat(groups[key]);
        return key + ": " + names(key);
    });

    return Response.success({
        name: doc.select("#post-data h1").text(),
        author: names("声優") || names("サークル"),
        cover: doc.select("#post-data video").attr("poster"),
        detail: detail.join("<br>") + "<br>Đăng: " + doc.select("#post-time").text(),
        url: url,
        type: "audio",
        format: "album",
        ongoing: false,
        nsfw: !/\/allages\//.test(url),
        genres: genres.concat(doc.select("#post-category a").map(function (a) {
            return { title: a.text(), input: a.attr("href"), script: "search.js" };
        }))
    });
}
