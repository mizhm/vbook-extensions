load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let ncode = url.match(/\/(n\d+[a-z]+)/i)[1].toLowerCase();
    let response = fetch(API_URL + "&ncode=" + ncode);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let novel = response.json()[1];
    if (!novel) return Response.error("Không tìm thấy truyện");

    let genre = String(novel.nocgenre);
    let tags = novel.keyword ? novel.keyword.split(/\s+/) : [];

    return Response.success({
        name: novel.title,
        author: novel.writer,
        description: novel.story.replace(/\n/g, "<br>"),
        detail: "Site: " + (GENRES[genre] || genre)
            + "<br>Số tập: " + (novel.novel_type === 2 ? "短編" : novel.general_all_no)
            + "<br>Số chữ: " + novel.length
            + "<br>Cập nhật: " + novel.general_lastup,
        url: url,
        type: "novel",
        format: "novel",
        ongoing: novel.end === 1,
        tags: tags.map(function (tag) {
            return { title: tag, input: "keyword=1&word=" + encodeURIComponent(tag) + "&order=hyoka", script: "search.js" };
        }),
        genres: [
            { title: GENRES[genre] || "Cùng thể loại", input: "nocgenre=" + genre + "&order=weeklypoint", script: "search.js" }
        ]
    });
}
