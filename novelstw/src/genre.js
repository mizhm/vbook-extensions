function execute() {
    let genres = [
        ["11", "成人"], ["12", "肉文"], ["13", "精肉"], ["1", "玄幻"], ["2", "武俠"],
        ["3", "都市"], ["4", "曆史"], ["5", "科幻"], ["6", "遊戲"], ["7", "女生"],
        ["9", "其他"], ["10", "短篇"]
    ];
    return Response.success(genres.map(function (g) {
        return { title: g[1], input: "/nosort/" + g[0] + "/", script: "search.js" };
    }));
}
