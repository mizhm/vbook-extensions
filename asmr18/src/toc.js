load('config.js');
// Each tab's player script is a p,a,c,k,e,d-packed hls.js loader; unpack it to read the m3u8 URL.
function unpack(script) {
    let m = script.match(/\}\('((?:[^'\\]|\\.)*)',\d+,\d+,'([^']*)'\.split\('\|'\)/);
    if (!m) return "";
    let words = m[2].split("|");
    return m[1].replace(/\b\w+\b/g, function (w) {
        return words[parseInt(w, 36)] || w;
    });
}

function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let tracks = [];
    doc.select(".tab_content").forEach(function (tab) {
        let src = unpack(tab.select("script").html()).match(/https?:\/\/[^'\\]+\.m3u8/);
        if (!src) return;
        let label = doc.select("label[for=" + tab.attr("id").replace("_content", "") + "]").text();
        tracks.push({ name: label || "Track " + (tracks.length + 1), url: src[0], description: "", lock: false, pay: false });
    });

    if (tracks.length === 0) return Response.error("Không tìm thấy audio");
    return Response.success(tracks);
}
