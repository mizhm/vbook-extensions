load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let result = fetchPage(url);
    if (result.error) return result.error;
    let doc = result.doc;

    let info = doc.select(".novel_info_title p").text();
    let desc = doc.select(".intro").html().replace(/\\+n/g, "<br>");
    return Response.success({
        name: doc.select(".novel_info_title h1").text(),
        author: doc.select(".novel_info_title i a").text(),
        cover: absUrl(doc.select(".novel_info_main img").attr("src")),
        description: desc,
        detail: "Tác giả: " + doc.select(".novel_info_title i a").text() + "<br>" + info,
        url: url,
        type: "novel",
        format: "novel",
        ongoing: info.indexOf("完") === -1,
        host: BASE_URL
    });
}
