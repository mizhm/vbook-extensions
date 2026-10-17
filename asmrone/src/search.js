load('config.js');
// query is a keyword, or an API path ("/api/...") passed from home/genre/detail tags.
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let path = query.indexOf("/api/") === 0 ? query : "/api/search/" + encodeURIComponent(query) + "?order=dl_count&sort=desc";
    let json = apiGet(path + (path.indexOf("?") === -1 ? "?" : "&") + "pageSize=20&page=" + page);
    if (!json || !json.works) return Response.error("Không tải được danh sách");

    let items = json.works.map(toItem);
    let p = json.pagination;
    let hasNext = p.currentPage * p.pageSize < p.totalCount;
    return Response.success(items, hasNext ? String(p.currentPage + 1) : "");
}
