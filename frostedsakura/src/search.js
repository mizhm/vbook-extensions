load('config.js');
// query is a keyword (folder search), or a folder path ("/Youtube") whose sub-folders are listed.
let PAGE_SIZE = 50;

function execute(query, page) {
    query = query || "";
    page = parseInt(page || "1");

    let items = [];
    let data;
    if (query.indexOf("/") === 0) {
        data = api("list", { path: query, page: page, per_page: PAGE_SIZE, refresh: false });
        if (!data) return Response.error("Không tải được thư mục");
        (data.content || []).forEach(function (c) {
            if (c.is_dir) items.push(folderItem(query + "/" + c.name, c));
        });
    } else {
        data = api("search", { parent: "/", keywords: query, scope: 1, page: page, per_page: PAGE_SIZE });
        if (!data) return Response.error("Không tìm được");
        (data.content || []).forEach(function (c) {
            // shortcut: search reports storage paths under "/zshare" while browsing uses the
            // alias root; update if the site mounts other storages.
            items.push(folderItem(c.parent.replace(/^\/zshare/, "") + "/" + c.name, c));
        });
    }
    return Response.success(items, page * PAGE_SIZE < data.total ? String(page + 1) : "");
}
