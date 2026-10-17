load('config.js');
function execute(data) {
    let m = data.match(/^(.*?)(?:\?sub=([^&]+))?$/);
    let lyrics = [];
    if (m[2]) {
        let r = fetch(API_URL + "/api/media/stream/" + decodeURIComponent(m[2]), { headers: API_HEADERS });
        if (r.ok) lyrics.push({ data: r.text() });
    }
    return Response.success({
        type: "native",
        data: m[1],
        headers: API_HEADERS,
        lyrics: lyrics
    });
}
