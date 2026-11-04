load('config.js');
// One <video> per file: new posts have a single HLS stream, older ones mp3/m4a sources.
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let videos = doc.select("#cleanp_audio video");
    let tracks = [];
    for (let i = 0; i < videos.size(); i++) {
        let v = videos.get(i);
        let src = v.select("source").attr("src");
        if (!src) continue;
        tracks.push({ name: v.attr("title") || "Track " + (i + 1), url: src, description: "", lock: false, pay: false });
    }

    if (tracks.length === 0) return Response.error("Không tìm thấy audio");
    return Response.success(tracks);
}
