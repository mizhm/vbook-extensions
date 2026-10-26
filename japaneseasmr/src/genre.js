load('config.js');
function execute() {
    let genres = [
        { title: "SFW / 全年齢", input: "/category/rating/sfw/", script: "search.js" },
        { title: "R-15", input: "/category/rating/r-15/", script: "search.js" },
        { title: "NSFW / R18", input: "/category/rating/maniax/", script: "search.js" },
        { title: "R-18G / グロ", input: "/category/rating/extreme/", script: "search.js" },
        { title: "Otoko no ko / 男の娘", input: "/category/otokonoko/", script: "search.js" },
        { title: "Futanari / フタナリ", input: "/category/futanari/", script: "search.js" },
        { title: "Requested", input: "/category/requested/", script: "search.js" }
    ];
    // All site tags come from the /tags/ cloud; a tag can sit in several groups.
    let response = fetch(BASE_URL + "/tags/");
    if (!response.ok) return Response.success(genres);
    let seen = {};
    response.html().select(".tag-groups-tag a").forEach(function (a) {
        let href = a.attr("href");
        if (seen[href]) return;
        seen[href] = true;
        genres.push({ title: a.text(), input: href, script: "search.js" });
    });
    return Response.success(genres);
}
