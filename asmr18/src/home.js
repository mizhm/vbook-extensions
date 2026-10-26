function execute() {
    return Response.success([
        { title: "Nam / 男子向け", input: "/boys/", script: "search.js" },
        { title: "Nữ / 乙女向け", input: "/girls/", script: "search.js" },
        { title: "Mọi lứa tuổi / 全年齢", input: "/allages/", script: "search.js" },
        { title: "Thịnh hành / 急上昇", input: "/trend/", script: "search.js" },
        { title: "Phổ biến / 人気", input: "/popularity/", script: "search.js" },
        { title: "Đánh giá cao / 高評価", input: "/rated/", script: "search.js" }
    ]);
}
