load('config.js');
// query is either a keyword or a "key=value&..." filter string from home/genre tabs.
function execute(query, page) {
    query = query || "";
    page = page || "1";
    let params = /^[a-z_]+=/.test(query) ? query : "q=" + encodeURIComponent(query);
    let state = apolloState(BASE_URL + "/search?" + params + "&page=" + page);
    if (!state) return Response.error("Không tải được trang tìm kiếm");

    let root = state.ROOT_QUERY;
    let result = null;
    for (let key in root) {
        if (key.indexOf("searchWorks") === 0) result = root[key];
    }
    if (!result) return Response.success([], "");

    let items = result.nodes.map(function (node) {
        let work = state[node.__ref];
        let author = state[work.author.__ref];
        return {
            name: work.title,
            link: BASE_URL + "/works/" + work.id,
            cover: workCover(work.id),
            description: (author ? author.activityName : "") + " · " + work.publicEpisodeCount + "話",
            tag: work.serialStatus === "COMPLETED" ? "完結" : ""
        };
    });
    let next = result.pageInfo && result.pageInfo.hasNextPage ? String(parseInt(page) + 1) : "";
    return Response.success(items, next);
}
