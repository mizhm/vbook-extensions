load('config.js');
// query is a keyword, or a listing path/URL ("/category/...", "/?filter=...") from home/genre/detail.
// WordPress pages as <path>/page/N?<query>.
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let path;
    if (query.indexOf("/") === 0) path = query;
    else if (query.indexOf("http") === 0) path = query.replace(/^https?:\/\/[^\/]+/, "");
    else path = "/?s=" + encodeURIComponent(query);
    let q = path.indexOf("?");
    let search = q < 0 ? "" : path.substring(q);
    path = (q < 0 ? path : path.substring(0, q)).replace(/\/+$/, "");
    let url = BASE_URL + path + (page === "1" ? "/" : "/page/" + page) + search;

    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = [];
    doc.select("article.loop-video").forEach(function (el) {
        let a = el.select("a").first();
        if (!a) return;
        items.push({
            name: a.attr("title") || el.select(".entry-header").text(),
            link: a.attr("href"),
            cover: el.select("img").attr("data-src"),
            description: el.select(".rjcodes").text() + " · " + el.select(".duration").text()
        });
    });

    let next = new RegExp("/page/" + (parseInt(page) + 1) + "(?:[/?]|$)");
    let hasNext = false;
    doc.select(".pagination a[href]").forEach(function (a) {
        if (next.test(a.attr("href"))) hasNext = true;
    });
    return Response.success(items, hasNext ? String(parseInt(page) + 1) : "");
}
