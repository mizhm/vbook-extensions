load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let cv = doc.select("#video-actors a").map(function (a) { return a.text(); }).join(", ");
    let desc = doc.select(".video-description .desc").first();
    // App does not render `tags`, so categories and tags all go into genres.
    let genres = doc.select(".tags-list a").map(function (a) {
        return { title: a.text(), input: a.attr("href"), script: "search.js" };
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
        genres: genres
    });
}
