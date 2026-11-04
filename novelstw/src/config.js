let BASE_URL = "https://www.novels.com.tw";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function absUrl(path) {
    if (!path) return "";
    return path.indexOf("http") === 0 ? path : BASE_URL + path;
}

// Site is behind a Cloudflare challenge: plain fetch gets 403 until the user passes it once in the vBook browser.
function fetchPage(url, options) {
    let response = fetch(url, options);
    // Site rate-limits bursts with 429: back off and retry before giving up.
    for (let i = 1; i <= 3 && response.status === 429; i++) {
        sleep(1500 * i);
        response = fetch(url, options);
    }
    if (response.status === 429) return { error: Response.error("Bị giới hạn tốc độ (HTTP 429), thử lại sau ít phút") };
    if (response.status === 403 || response.status === 503) {
        return { error: Response.error("Cloudflare chặn (HTTP " + response.status + "): mở " + BASE_URL + " bằng trình duyệt trong app để qua xác minh rồi thử lại") };
    }
    if (!response.ok) return { error: Response.error("HTTP " + response.status) };
    return { doc: response.html() };
}

// Site text contains literal "\n" sequences in blurbs.
function cleanText(text) {
    return String(text).replace(/\\+n/g, " ").replace(/\s+/g, " ").trim();
}

function parseItems(doc) {
    let items = [];
    doc.select("li:has(.img_span)").forEach(function (el) {
        let a = el.select(".img_span a").first();
        if (!a) return;
        let cover = el.select(".img_span img").attr("data-original");
        items.push({
            name: el.select("h2, h3").first().text(),
            cover: absUrl(cover),
            link: absUrl(a.attr("href")),
            description: cleanText(el.select("p.indent, p.searchresult_p").text()),
            host: BASE_URL
        });
    });
    return items;
}
