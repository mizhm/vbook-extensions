load('config.js');
// query is a keyword, or a "/"-prefixed list path (e.g. "/nosort/1/") from home/genre; pages are "<path><n>/".
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let result;
    if (query.indexOf("/") === 0) {
        result = fetchPage(BASE_URL + query + page + "/");
    } else {
        // search returns everything (max 100) on a single page
        if (page !== "1") return Response.success([], "");
        result = fetchPage(BASE_URL + "/search/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "searchkey=" + encodeURIComponent(query) + "&searchtype=all" });
    }
    if (result.error) return result.error;

    let items = parseItems(result.doc);
    let isList = query.indexOf("/") === 0;
    return Response.success(items, isList && items.length > 0 ? String(parseInt(page) + 1) : "");
}
