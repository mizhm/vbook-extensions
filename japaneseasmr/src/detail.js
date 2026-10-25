load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let cv = "";
    let rj = "";
    doc.select(".entry-content p").forEach(function (p) {
        let t = p.text();
        if (t.indexOf("CV:") === 0) cv = t.substring(3).trim();
        if (t.indexOf("RJ Code:") === 0) rj = t.substring(8).trim();
    });
    let cats = doc.select(".post-meta-span-category a");
    let circle = "";
    let nsfw = false;
    let genres = cats.map(function (a) {
        let href = a.attr("href");
        if (/\/rating\/(maniax|extreme)\//.test(href)) nsfw = true;
        if (!/\/(rating|requested)\//.test(href)) circle = a.text();
        return { title: a.text(), input: href, script: "search.js" };
    });
    let cover = doc.select("img[data-src*=_img_main]").attr("data-src") || doc.select("#cleanp_audio video").attr("poster");

    return Response.success({
        name: doc.select("h1.page-title").text(),
        author: cv || circle,
        cover: cover,
        description: doc.select("div[itemprop=description]").first() ? doc.select("div[itemprop=description]").first().html() : "",
        detail: "RJ: " + rj + "<br>Circle: " + circle + "<br>CV: " + cv +
            "<br>Đăng: " + doc.select(".entry-tagline time").attr("datetime"),
        url: url,
        type: "audio",
        format: "album",
        ongoing: false,
        nsfw: nsfw,
        tags: doc.select(".post-tags a[rel=tag]").map(function (a) {
            return { title: a.text(), input: a.attr("href"), script: "search.js" };
        }),
        genres: genres
    });
}
