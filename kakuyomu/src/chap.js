load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();
    let content = rubyToText(doc.select(".widget-episodeBody").html());
    return Response.success(content, doc.select(".widget-episodeTitle").text());
}

// The reader can't render <ruby> and the bridge can't rewrite DOM nodes,
// so convert in the HTML string: <ruby>漢字<rt>かんじ</rt></ruby> -> 漢字《かんじ》.
function rubyToText(html) {
    return html.replace(/<rp[^>]*>[\s\S]*?<\/rp>/g, "")
        .replace(/<rt[^>]*>([\s\S]*?)<\/rt>/g, "《$1》")
        .replace(/<\/?(?:ruby|rb)[^>]*>/g, "");
}
