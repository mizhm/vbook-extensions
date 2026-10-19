load('config.js');
function execute(url) {
    url = normalizeUrl(url).replace(/\/$/, "");
    let id = url.match(/works\/(\d+)/)[1];
    let state = apolloState(url);
    if (!state) return Response.error("Không tải được truyện");
    let work = state["Work:" + id];
    let author = state[work.author.__ref];
    let genre = String(work.genre).toLowerCase();

    let description = "";
    if (work.catchphrase) description += "<b>" + work.catchphrase + "</b><br><br>";
    description += (work.introduction || "").replace(/\n/g, "<br>");

    return Response.success({
        name: work.title,
        author: author ? author.activityName : "",
        cover: work.ogImageUrl || workCover(id),
        description: description,
        detail: "Số tập: " + work.publicEpisodeCount + "<br>Số chữ: " + work.totalCharacterCount
            + "<br>Cập nhật: " + String(work.lastEpisodePublishedAt || "").substring(0, 10),
        url: url,
        type: "novel",
        format: "novel",
        ongoing: work.serialStatus !== "COMPLETED",
        tags: (work.tagLabels || []).map(function (tag) {
            return { title: tag, input: tag, script: "search.js" };
        }),
        genres: [
            { title: "Cùng thể loại", input: "genre_name=" + genre + "&order=weekly_ranking", script: "search.js" }
        ]
    });
}
