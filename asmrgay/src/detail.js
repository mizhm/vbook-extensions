load('config.js');
function execute(url) {
    let path = pagePath(url);
    let data = api("get", { path: path });
    if (!data || !data.is_dir) return Response.error("Không tìm thấy thư mục");

    let parent = path.replace(/\/[^\/]*$/, "");
    return Response.success({
        name: data.name,
        author: parent.substring(parent.lastIndexOf("/") + 1),
        cover: "",
        description: path,
        detail: "Thư mục: " + path + "<br>Cập nhật: " + (data.modified || "").substring(0, 10),
        url: pageUrl(path),
        type: "audio",
        format: "album",
        ongoing: true,
        nsfw: true,
        genres: [{ title: "Thư mục cha: " + parent, input: parent, script: "search.js" }]
    });
}
