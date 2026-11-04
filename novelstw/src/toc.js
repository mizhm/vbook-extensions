load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let result = fetchPage(url);
    if (result.error) return result.error;

    let chapters = [];
    result.doc.select("#catalog .chapters a").forEach(function (el) {
        chapters.push({
            name: el.text(),
            url: absUrl(el.attr("href")),
            host: BASE_URL
        });
    });
    return Response.success(chapters);
}
