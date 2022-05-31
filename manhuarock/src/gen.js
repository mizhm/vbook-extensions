function execute(url, page) {
    if (!page) page = "1";
    const doc = Http.get(url + "/" + page).html();

    var next = doc.select(".pagination").select("li.active + li").text();
    console.log(next);
    const el = doc.select(".listupd .page-item");

    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var coverImg = e.select(".thumb-manga img").first().attr("data-src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        data.push({
            name: e.select("h3 a").first().text(),
            link: e.select("h3 a").first().attr("href"),
            cover: coverImg,
            host: "https://manhuarock.net",
        });
    }

    return Response.success(data, next);
}
