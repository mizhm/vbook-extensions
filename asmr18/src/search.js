load('config.js');
// query is a keyword, or a listing path/URL ("/boys/", "/genre/.../") from home/genre/detail.
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let url;
    if (query.indexOf("/") === 0 || query.indexOf("http") === 0) {
        url = BASE_URL + query.replace(/^https?:\/\/[^\/]+/, "") + (page === "1" ? "" : "page/" + page + "/");
    } else {
        url = BASE_URL + (page === "1" ? "/" : "/page/" + page + "/") + "?s=" + encodeURIComponent(query);
    }
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = [];
    doc.select(".post-list > a").forEach(function (a) {
        items.push({
            name: a.select("span").text(),
            link: a.attr("href"),
            cover: a.select("img").attr("src"),
            description: a.select(".post-list-time").text()
        });
    });

    let hasNext = !doc.select("a.nextpostslink").isEmpty();
    return Response.success(items, hasNext ? String(parseInt(page) + 1) : "");
}
