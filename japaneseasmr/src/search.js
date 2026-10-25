load('config.js');
// query is a keyword, or a listing path/URL ("/category/.../") from home/genre/detail.
// Cloudflare challenges any URL with a query string, so search uses the /search/<kw>/ permalink.
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let path;
    if (query.indexOf("/") === 0) path = query;
    else if (query.indexOf("http") === 0) path = query.replace(/^https?:\/\/[^\/]+/, "");
    else path = "/search/" + encodeURIComponent(query) + "/";
    let response = fetch(BASE_URL + path + (page === "1" ? "" : "page/" + page + "/"));
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = [];
    doc.select("li.site-archive-post").forEach(function (el) {
        let a = el.select("h2.entry-title a").first();
        if (!a) return;
        let cv = "";
        el.select("p").forEach(function (p) {
            if (p.text().indexOf("CV:") === 0) cv = p.text();
        });
        items.push({
            name: a.text(),
            link: a.attr("href"),
            cover: el.select("img").attr("data-src"),
            description: cv,
            tag: el.select(".post-meta-span-category a").text()
        });
    });

    let hasNext = !doc.select("a.next.page-numbers").isEmpty();
    return Response.success(items, hasNext ? String(parseInt(page) + 1) : "");
}
