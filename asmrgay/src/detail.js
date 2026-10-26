load('config.js');
// Folders mix audio and video; the video player shows a black screen for audio, so pick
// the player from the files (OpenList type 2 = video).
// shortcut: checks at most MAX_LISTS folders, so video nested deeper falls back to audio.
let MAX_LISTS = 10;

function hasVideo(path) {
    let queue = [path];
    for (let i = 0; i < queue.length && i < MAX_LISTS; i++) {
        let data = api("list", { path: queue[i], page: 1, per_page: 0, refresh: false });
        let content = (data && data.content) || [];
        for (let j = 0; j < content.length; j++) {
            if (content[j].type === 2) return true;
            if (content[j].is_dir) queue.push(queue[i] + "/" + content[j].name);
        }
    }
    return false;
}

function execute(url) {
    let path = pagePath(url);
    let data = api("get", { path: path });
    if (!data || !data.is_dir) return Response.error("Không tìm thấy thư mục");

    let parent = path.replace(/\/[^\/]*$/, "");
    let video = hasVideo(path);
    return Response.success({
        name: data.name,
        author: parent.substring(parent.lastIndexOf("/") + 1),
        cover: "",
        description: path,
        detail: "Thư mục: " + path + "<br>Cập nhật: " + (data.modified || "").substring(0, 10),
        url: pageUrl(path),
        type: video ? "video" : "audio",
        format: video ? "series" : "album",
        ongoing: true,
        nsfw: true,
        genres: [{ title: "Thư mục cha: " + parent, input: parent, script: "search.js" }]
    });
}
