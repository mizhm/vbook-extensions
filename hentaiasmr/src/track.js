load('config.js');
function execute(data) {
    return Response.success({ type: "native", data: data, headers: MEDIA_HEADERS });
}
