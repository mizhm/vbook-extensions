function execute() {
    return Response.success([
        { title: "Mới nhất", input: "/api/works?order=create_date&sort=desc", script: "search.js" },
        { title: "Mới phát hành", input: "/api/works?order=release&sort=desc", script: "search.js" },
        { title: "Tải nhiều", input: "/api/works?order=dl_count&sort=desc", script: "search.js" },
        { title: "Đánh giá cao", input: "/api/works?order=rate_average_2dp&sort=desc", script: "search.js" },
        { title: "Có phụ đề", input: "/api/works?order=create_date&sort=desc&subtitle=1", script: "search.js" }
    ]);
}
