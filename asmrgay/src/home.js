load('config.js');
function execute() {
    let data = api("list", { path: "/", page: 1, per_page: 0 });
    if (!data) return Response.error("Không tải được thư mục gốc");
    return Response.success(data.content.filter(function (c) { return c.is_dir && c.name !== "更新日志"; }).map(function (c) {
        return { title: c.name, input: "/" + c.name, script: "search.js" };
    }));
}
