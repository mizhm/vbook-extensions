load('config.js');
// New posts have one HLS stream plus a chapter table of start offsets (seconds): each
// chapter becomes a "<m3u8>#<start>-<end>" track that track.js cuts out of the stream.
// Older posts have one <video> per file, each with mp3/m4a <source>s.
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let videos = doc.select("#cleanp_audio video");
    let marks = doc.select("#plyr-chapter-playlist a[data-track-title]");
    let tracks = [];
    for (let i = 0; i < videos.size(); i++) {
        let v = videos.get(i);
        let src = v.select("source").attr("src");
        if (!src) continue;
        if (videos.size() === 1 && /\.m3u8$/.test(src) && marks.size() > 1) {
            for (let j = 0; j < marks.size(); j++) {
                let m = marks.get(j);
                let end = j + 1 < marks.size() ? marks.get(j + 1).attr("data-value") : "";
                tracks.push({
                    name: m.attr("data-track-title"),
                    url: src + "#" + m.attr("data-value") + "-" + end,
                    description: doc.select("#plyr-chapter-playlist td.start_time a").get(j).text(),
                    lock: false,
                    pay: false
                });
            }
            continue;
        }
        tracks.push({ name: v.attr("title") || "Track " + (i + 1), url: src, description: "", lock: false, pay: false });
    }

    if (tracks.length === 0) return Response.error("Không tìm thấy audio");
    return Response.success(tracks);
}
