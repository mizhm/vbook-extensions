load('config.js');
load('crypto.js');
// A chapter is split over several pages (<id>.html, <id>_2.html, ...) listed in #pageselect.
// Each page ships its text as base64 AES-128-CBC in window.encryptedContent (fixed key, zero IV).
function execute(url) {
    url = normalizeUrl(url);
    let result = fetchPage(url);
    if (result.error) return result.error;
    let doc = result.doc;

    let pages = [];
    doc.select("#pageselect option").forEach(function (el) { pages.push(el.attr("value")); });

    let title = doc.select(".text_title h1").text().replace(/\s*[（(]\s*\d+\s*\/\s*\d+\s*[）)]\s*$/, "");
    let content = pageContent(doc);
    for (let i = 1; i < pages.length; i++) {
        sleep(300);
        let next = fetchPage(absUrl(pages[i]));
        if (next.error) return next.error;
        content += pageContent(next.doc);
    }
    if (!content) return Response.error("Không giải mã được nội dung chương");
    return Response.success(content, title);
}

function pageContent(doc) {
    let m = doc.select("#chapter-content script").html().match(/encryptedContent\s*=\s*"([^"]*)"/);
    if (!m) return "";
    let encrypted = m[1].replace(/\\\//g, "/");
    let plain = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse("WZc0cbzgY3lhz3X6"), {
        iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    // payload carries stray control bytes after the last tag
    return plain.replace(/[\u0000-\u0008]+$/, "").replace(/\r/g, "");
}
