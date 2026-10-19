function execute() {
    return Response.success([
        { title: "Xếp hạng tuần", input: "order=weekly_ranking", script: "search.js" },
        { title: "Phổ biến", input: "order=popular", script: "search.js" },
        { title: "Mới cập nhật", input: "order=last_episode_published_at", script: "search.js" },
        { title: "Mới đăng", input: "order=published_at", script: "search.js" }
    ]);
}
