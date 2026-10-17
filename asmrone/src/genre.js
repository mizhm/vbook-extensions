load('config.js');
function execute() {
    let tags = apiGet("/api/tags/");
    if (!tags) return Response.error("Không tải được thể loại");

    tags.sort(function (a, b) { return b.count - a.count; });
    return Response.success(tags.map(function (t) {
        let en = t.i18n && t.i18n["en-us"] ? t.i18n["en-us"].name : "";
        return {
            title: en || t.name,
            input: "/api/search/" + encodeURIComponent("$tag:" + t.name + "$") + "?order=release&sort=desc",
            script: "search.js"
        };
    }));
}
