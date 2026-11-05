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
        // Plain fetch can be rejected (e.g. iOS network stack, missing clearance) while the in-app WebView passes.
        let doc = browserFetch(url, options);
        if (doc) return { doc: doc };
        let title = Html.parse(String(response.text())).select("title").text();
        return { error: Response.error("Cloudflare chặn (HTTP " + response.status + ", \"" + title + "\"): mở " + BASE_URL + " bằng trình duyệt trong app để qua xác minh rồi thử lại") };
    }
    if (!response.ok) return { error: Response.error("HTTP " + response.status) };
    return { doc: response.html() };
}

// Loads the page in the headless WebView (which carries the browser's Cloudflare state); POST is done as a same-origin sync XHR.
function browserFetch(url, options) {
    let browser = Engine.newBrowser();
    try {
        let isPost = options && options.method === "POST";
        let doc = browser.launch(isPost ? BASE_URL + "/" : url, 20000);
        for (let i = 0; i < 4 && doc && /Just a moment/i.test(doc.select("title").text()); i++) {
            doc = browser.html(3000);
        }
        if (!doc || /Just a moment/i.test(doc.select("title").text())) return null;
        if (!isPost) return doc;
        let js = "var x=new XMLHttpRequest();x.open('POST'," + JSON.stringify(url.replace(BASE_URL, "")) +
            ",false);x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');x.send(" +
            JSON.stringify(String(options.body)) + ");encodeURIComponent(x.responseText)";
        let text = String(browser.callJs(js, 15000).text());
        return text ? Html.parse(decodeURIComponent(text)) : null;
    } catch (e) {
        return null;
    } finally {
        browser.close();
    }
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
