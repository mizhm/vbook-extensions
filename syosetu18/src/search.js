load('config.js');
const PAGE_SIZE = 20;
// query is either a keyword or a "key=value&..." API filter string from home/genre tabs.
function execute(query, page) {
    query = query || "";
    page = parseInt(page || "1");
    let params = /^[a-z_]+=/.test(query) ? query : "word=" + encodeURIComponent(query) + "&order=hyoka";
    let response = fetch(API_URL + "&of=t-n-w-nt-e-ga&lim=" + PAGE_SIZE
        + "&st=" + ((page - 1) * PAGE_SIZE + 1) + "&" + params);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let json = response.json();

    // First element is {allcount}; the API caps st at 2000.
    let items = json.slice(1).map(function (novel) {
        let ended = novel.end === 0;
        return {
            name: novel.title,
            link: BASE_URL + "/" + novel.ncode.toLowerCase() + "/",
            description: novel.writer + " · " + (novel.noveltype === 2 ? "短編" : novel.general_all_no + "話"),
            tag: novel.noveltype === 2 ? "短編" : (ended ? "完結" : "")
        };
    });
    let hasNext = page * PAGE_SIZE < Math.min(json[0].allcount, 2000);
    return Response.success(items, hasNext ? String(page + 1) : "");
}
