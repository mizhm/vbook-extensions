let BASE_URL = "https://ncode.syosetu.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

const API_URL = "https://api.syosetu.com/novelapi/api/?out=json";

const GENRES = {
    "101": "異世界〔恋愛〕", "102": "現実世界〔恋愛〕",
    "201": "ハイファンタジー", "202": "ローファンタジー",
    "301": "純文学", "302": "ヒューマンドラマ", "303": "歴史", "304": "推理",
    "305": "ホラー", "306": "アクション", "307": "コメディー",
    "401": "VRゲーム", "402": "宇宙", "403": "空想科学", "404": "パニック",
    "9901": "童話", "9902": "詩", "9903": "エッセイ", "9904": "リプレイ",
    "9999": "その他", "9801": "ノンジャンル"
};

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
