let BASE_URL = "https://kakuyomu.jp";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

// Pages are Next.js; all data lives in the Apollo cache inside __NEXT_DATA__.
function apolloState(url) {
    let response = fetch(url);
    if (!response.ok) return null;
    let json = response.html().select("script#__NEXT_DATA__").html();
    return JSON.parse(json).props.pageProps.__APOLLO_STATE__;
}

function workCover(id) {
    return "https://cdn-static.kakuyomu.jp/works/" + id + "/ogimage.png";
}
