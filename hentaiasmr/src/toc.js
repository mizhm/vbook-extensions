load('config.js');
// Tracks live only in the inline JWPlayer script: a playlist.push({file, image, title})
// per track, or a single jwplayer().setup({file: ...}) on older posts.
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let html = response.text();

    let re = /file:\s*"([^"]+)"(?:[^}]*?title:\s*"([^"]*)")?/g;
    let seen = {};
    let tracks = [];
    let m;
    while ((m = re.exec(html)) !== null) {
        if (seen[m[1]]) continue;
        seen[m[1]] = true;
        tracks.push({
            name: m[2] || "Track " + (tracks.length + 1),
            url: m[1],
            description: m[1].replace(/^.*\//, ""),
            lock: false,
            pay: false
        });
    }

    if (tracks.length === 0) return Response.error("Không tìm thấy audio");
    return Response.success(tracks);
}
