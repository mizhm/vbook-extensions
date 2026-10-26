load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let cv = doc.select("#video-actors a").map(function (a) { return a.text(); }).join(", ");
    let desc = doc.select(".video-description .desc").first();
    let genres = [];
    let tags = [];
    doc.select(".tags-list a").forEach(function (a) {
        let item = { title: a.text(), input: a.attr("href"), script: "search.js" };
        if (a.attr("href").indexOf("/category/") >= 0) genres.push(item);
        else tags.push(item);
    });

    return Response.success({
        name: doc.select("h2.entry-title").text(),
        author: cv,
        cover: doc.select("meta[itemprop=thumbnailUrl]").attr("content"),
        description: desc ? desc.html() : "",
        detail: "CV: " + cv + "<br>" + doc.select("#video-date").text(),
        url: url,
        type: "audio",
        format: "album",
        ongoing: false,
        nsfw: true,
        tags: tags,
        genres: genres
    });
}
