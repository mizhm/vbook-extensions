load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetchPage(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    // A short story has no episode list; its text is on the book page itself.
    if (doc.select(".p-eplist").isEmpty()) {
        return Response.success([{ name: doc.select(".p-novel__title").text(), url: url.replace(/\?.*$/, ""), description: "", lock: false, pay: false }]);
    }

    let chapters = [];
    let section = "";
    doc.select(".p-eplist__chapter-title, .p-eplist__sublist").forEach(function (el) {
        if (el.attr("class").indexOf("chapter-title") !== -1) {
            section = el.text();
            return;
        }
        let link = el.select("a.p-eplist__subtitle");
        chapters.push({
            name: link.text(),
            url: BASE_URL + link.attr("href"),
            description: section,
            lock: false,
            pay: false
        });
    });
    return Response.success(chapters);
}
