load('config.js');
// "<m3u8>#<start>-<end>" is one chapter of a merged stream: return a playlist of the
// segments overlapping [start, end).
// shortcut: cuts on ~10s segment boundaries, so a track may start a few seconds early.
function execute(data) {
    let m = data.match(/^(.*\.m3u8)#(\d+)-(\d*)$/);
    if (!m) return Response.success({ type: "native", data: data, headers: MEDIA_HEADERS });

    let response = fetch(m[1], { headers: MEDIA_HEADERS });
    if (!response.ok) return Response.error("HTTP " + response.status);
    let start = Number(m[2]);
    let end = m[3] ? Number(m[3]) : Infinity;
    let base = m[1].replace(/[^\/]*$/, "");

    let head = [];
    let body = [];
    let t = 0;
    let dur = -1;
    response.text().split("\n").forEach(function (line) {
        line = line.trim();
        if (!line || line === "#EXT-X-ENDLIST") return;
        if (line.indexOf("#EXTINF:") === 0) {
            dur = parseFloat(line.substring(8));
            return;
        }
        if (line.charAt(0) === "#") {
            if (dur < 0) head.push(line);
            return;
        }
        if (t + dur > start && t < end) body.push("#EXTINF:" + dur + ",", /^https?:/.test(line) ? line : base + line);
        t += dur;
    });
    if (body.length === 0) return Response.error("Không cắt được track");

    return Response.success({
        type: "native",
        data: head.concat(body).join("\n") + "\n#EXT-X-ENDLIST\n",
        headers: MEDIA_HEADERS
    });
}
