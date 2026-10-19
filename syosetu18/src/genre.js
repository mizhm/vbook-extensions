load('config.js');
function execute() {
    let genres = [];
    for (let id in GENRES) {
        genres.push({ title: GENRES[id], input: "nocgenre=" + id + "&order=weeklypoint", script: "search.js" });
    }
    return Response.success(genres);
}
