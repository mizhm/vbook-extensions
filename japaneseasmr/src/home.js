function execute() {
    return Response.success([
        { title: "Mới nhất", input: "/", script: "search.js" },
        { title: "Requested", input: "/category/requested/", script: "search.js" },
        { title: "SFW", input: "/category/rating/sfw/", script: "search.js" },
        { title: "R-15", input: "/category/rating/r-15/", script: "search.js" },
        { title: "R-18", input: "/category/rating/maniax/", script: "search.js" }
    ]);
}
