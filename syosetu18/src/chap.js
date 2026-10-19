load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetchPage(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    // Preface, body and afterword are separate .js-novel-text blocks.
    let content = doc.select(".js-novel-text").map(function (el) {
        return rubyToText(el.html());
    }).join("<br><hr><br>");
    let title = doc.select(".p-novel__subtitle-episode").text() || doc.select(".p-novel__title").text();
    return Response.success(content, title);
}
