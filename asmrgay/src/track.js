load('config.js');
// raw_url is a signed direct link, so resolve it at play time.
function execute(data) {
    let file = api("get", { path: pagePath(data) });
    if (!file || !file.raw_url) return Response.error("Không lấy được link file");
    return Response.success({ type: "native", data: file.raw_url });
}
