load('config.js');
function execute() {
    let response = fetch(BASE_URL + "/genre/");
    if (!response.ok) return Response.error("HTTP " + response.status);
    return Response.success(response.html().select(".tag-list a").map(function (a) {
        return { title: a.text().replace(/\s*\(\d+\)$/, ""), input: a.attr("href"), script: "search.js" };
    }));
}
