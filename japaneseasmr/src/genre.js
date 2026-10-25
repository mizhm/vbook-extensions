function execute() {
    return Response.success([
        { title: "SFW / 全年齢", input: "/category/rating/sfw/", script: "search.js" },
        { title: "R-15", input: "/category/rating/r-15/", script: "search.js" },
        { title: "NSFW / R18", input: "/category/rating/maniax/", script: "search.js" },
        { title: "R-18G / グロ", input: "/category/rating/extreme/", script: "search.js" },
        { title: "Yuri / 百合", input: "/tag/yuri-girls-love/", script: "search.js" },
        { title: "Otoko no ko / 男の娘", input: "/category/otokonoko/", script: "search.js" },
        { title: "Futanari / フタナリ", input: "/category/futanari/", script: "search.js" },
        { title: "Requested", input: "/category/requested/", script: "search.js" }
    ]);
}
