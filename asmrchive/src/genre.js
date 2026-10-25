load('config.js');
function execute() {
    let json = apiGet("/api/browse");
    if (!json) return Response.error("Không tải được danh mục");
    return Response.success(json.items.map(function (f) {
        return {
            title: f.name,
            input: "/api/search?q=&type=audio&sort=date_desc&root=" + encodeURIComponent(f.path),
            script: "search.js"
        };
    }));
}
