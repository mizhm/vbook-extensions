let BASE_URL = "https://novel18.syosetu.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

const API_URL = "https://api.syosetu.com/novel18api/api/?out=json";

// nocgenre: which R18 site a novel belongs to.
const GENRES = {
    "1": "ノクターンノベルズ",
    "2": "ムーンライトノベルズ (女性向け)",
    "3": "ムーンライトノベルズ (BL)",
    "4": "ミッドナイトノベルズ"
};

// Without this cookie every page redirects to the age-confirmation screen.
function fetchPage(url) {
    return fetch(url, { headers: { "Cookie": "over18=yes" } });
}

// Book/TOC pages need the trailing slash, which the app strips.
function normalizeUrl(url) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    return /\/(\?|$)/.test(url) ? url : url.replace(/(\?|$)/, "/$1");
}

// The reader can't render <ruby> and the bridge can't rewrite DOM nodes,
// so convert in the HTML string: <ruby>漢字<rt>かんじ</rt></ruby> -> 漢字《かんじ》.
function rubyToText(html) {
    return html.replace(/<rp[^>]*>[\s\S]*?<\/rp>/g, "")
        .replace(/<rt[^>]*>([\s\S]*?)<\/rt>/g, "《$1》")
        .replace(/<\/?(?:ruby|rb)[^>]*>/g, "");
}
