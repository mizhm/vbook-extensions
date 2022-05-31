function execute(url) {
    var doc = Http.get(url).html();

    var el = doc.select("ul.row-content-chapter li.a-h  a.chapter-name");
    const data = [];
    for (var i = el.size() - 1; i >= 0; i--) {
        var e = el.get(i);
        let chapter = e.attr("data-chapter-id");
        let url = "https://manhuarock.net/ajax/image/list/chap/" + chapter + "?mode=vertical&quality=high";
        data.push({
            name: e.text(),
            url: url,
            host: "https://manhuarock.net/",
        });
    }

    return Response.success(data);
}
