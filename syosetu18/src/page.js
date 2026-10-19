load('config.js');
// The TOC shows 100 episodes per page (?p=N); the "last" pager link gives N.
function execute(url) {
    url = normalizeUrl(url);
    let response = fetchPage(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let last = response.html().select(".c-pager__item--last").attr("href").match(/p=(\d+)/);
    let count = last ? parseInt(last[1]) : 1;

    let pages = [];
    for (let i = 1; i <= count; i++) pages.push(url + "?p=" + i);
    return Response.success(pages);
}
