load('config.js');
function execute(url) {
    url = normalizeUrl(url).replace(/\/$/, "");
    let id = url.match(/works\/(\d+)/)[1];
    let state = apolloState(url);
    if (!state) return Response.error("Không tải được mục lục");

    let chapters = [];
    (state["Work:" + id].tableOfContentsV2 || []).forEach(function (ref) {
        let section = state[ref.__ref];
        let chapter = section.chapter ? state[section.chapter.__ref] : null;
        section.episodeUnions.forEach(function (epRef) {
            let ep = state[epRef.__ref];
            chapters.push({
                name: ep.title,
                url: BASE_URL + "/works/" + id + "/episodes/" + ep.id,
                description: chapter ? chapter.title : "",
                lock: false,
                pay: false
            });
        });
    });
    return Response.success(chapters);
}
