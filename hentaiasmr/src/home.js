function execute() {
    return Response.success([
        { title: "Mới nhất", input: "/", script: "search.js" },
        { title: "Xem nhiều", input: "/?filter=most-viewed", script: "search.js" },
        { title: "Dài nhất", input: "/?filter=longest", script: "search.js" },
        { title: "乙女", input: "/category/otome", script: "search.js" },
        { title: "English", input: "/category/english", script: "search.js" },
        { title: "中文", input: "/category/chinese", script: "search.js" }
    ]);
}
