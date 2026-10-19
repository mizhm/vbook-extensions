function execute() {
    let genres = [
        ["fantasy", "異世界ファンタジー"],
        ["action", "現代ファンタジー"],
        ["sf", "SF"],
        ["love_story", "恋愛"],
        ["romance", "ラブコメ"],
        ["drama", "現代ドラマ"],
        ["horror", "ホラー"],
        ["mystery", "ミステリー"],
        ["nonfiction", "エッセイ・ノンフィクション"],
        ["history", "歴史・時代・伝奇"],
        ["criticism", "創作論・評論"],
        ["others", "詩・童話・その他"]
    ];
    return Response.success(genres.map(function (g) {
        return { title: g[1], input: "genre_name=" + g[0] + "&order=weekly_ranking", script: "search.js" };
    }));
}
