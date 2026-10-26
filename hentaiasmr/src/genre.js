load('config.js');
function execute() {
    let genres = [
        { title: "乙女 / Otome", input: "/category/otome", script: "search.js" },
        { title: "English", input: "/category/english", script: "search.js" },
        { title: "中文", input: "/category/chinese", script: "search.js" }
    ];
    let response = fetch(BASE_URL + "/tags");
    if (!response.ok) return Response.success(genres);
    response.html().select("#main a.tag-cloud-link").forEach(function (a) {
        genres.push({ title: a.text(), input: a.attr("href"), script: "search.js" });
    });
    return Response.success(genres);
}
