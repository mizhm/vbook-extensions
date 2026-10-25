load('config.js');
// Streaming needs a session cookie (POST /api/session) plus a short-lived access key per track.
// A cookie set earlier in the same run isn't attached by the jar, so pass it explicitly.
function requestAccess(key) {
    return fetch(BASE_URL + "/api/audio/key/" + key + "/access", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Cookie": localCookie.getCookie() },
        body: JSON.stringify({ purpose: "stream" })
    });
}

function execute(data) {
    let key = shareKey(normalizeUrl(data));
    if (!key) return Response.error("URL không hợp lệ");

    let response = requestAccess(key);
    if (response.status === 401) {
        fetch(BASE_URL + "/api/session", { method: "POST" });
        response = requestAccess(key);
        // A brand-new session is occasionally rejected for a moment.
        if (response.status === 401) {
            sleep(1000);
            response = requestAccess(key);
        }
    }
    if (!response.ok) {
        let error = "";
        try {
            error = response.json().error;
        } catch (e) {
        }
        return Response.error(error === "captcha_required" ? "Web đang yêu cầu captcha (chống spam), thử lại sau ít phút" : "Không lấy được quyền phát (HTTP " + response.status + " " + error + ")");
    }

    return Response.success({
        type: "native",
        data: BASE_URL + "/api/audio/key/" + key + "?access_key=" + encodeURIComponent(response.json().accessKey),
        headers: { "Cookie": localCookie.getCookie(), "Referer": BASE_URL + "/" }
    });
}
