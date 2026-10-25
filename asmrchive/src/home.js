function execute() {
    return Response.success([
        { title: "Mới phát hành", input: "/api/search?q=&type=audio&sort=date_desc", script: "search.js" },
        { title: "Mới thêm", input: "/api/playback/new", script: "search.js" },
        { title: "Phổ biến", input: "/api/playback/popular", script: "search.js" },
        { title: "Đang nghe", input: "/api/playback/recent", script: "search.js" }
    ]);
}
